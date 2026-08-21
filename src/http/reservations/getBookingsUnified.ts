/** @format */

import { buildAuthCookieHeader } from "@/lib/auth-headers";
import { type DashboardCacheMode } from "@/lib/dashboard-cache-policy";
import { cacheLife, cacheTag } from "next/cache";
import { consolidated_api } from "../api-client";
import { FetchFailedError } from "../conditional-cache";
import { logFetchFailed, logRequestTimeout } from "../logging";
import { isRetryableError, isRetryableStatus } from "../retry";
import { withKpiRequestTimeout } from "../kpi-request-timeout";
import {
  captureKpiCacheFailure,
  getKpiCacheIdentityTag,
  unwrapKpiCacheResult,
} from "../kpi-cache-result";

async function getBookingsUnifiedCached(
  startDate: string,
  endDate: string,
  cacheMode: DashboardCacheMode,
  cookieHeader: string | null,
) {
  "use cache";

  cacheTag("reservations");
  cacheTag(
    getKpiCacheIdentityTag(
      "reservations-unified",
      startDate,
      endDate,
      cacheMode,
      cookieHeader,
    ),
  );

  const controller = new AbortController();
  const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
  const requestName = "getBookingsUnified";
  let failed = false;
  let result: unknown;

  try {
    const resp = await withKpiRequestTimeout(
      (async () => {
        let response: Response | null = null;
        for (let attempt = 0; attempt < 2; attempt += 1) {
          try {
            response = await consolidated_api.get("Bookings/kpis/date-range", {
              searchParams: { startDate, endDate },
              headers:
                attempt === 0
                  ? authHeaders
                  : {
                      ...(authHeaders ?? {}),
                      "x-lhg-retry-attempt": String(attempt),
                    },
              signal: controller.signal,
              cache: "no-store",
              throwHttpErrors: false,
            });

            if (
              response.ok ||
              !isRetryableStatus(response.status) ||
              attempt === 1
            ) {
              break;
            }
          } catch (error) {
            if (!isRetryableError(error) || attempt === 1) {
              throw error;
            }
          }
        }
        return response;
      })(),
      controller,
    );

    if (!resp || !resp.ok) {
      throw new FetchFailedError(requestName, resp?.status, resp?.statusText);
    }

    result = await resp.json();
  } catch (error) {
    failed = true;
    result = captureKpiCacheFailure(error, requestName);
  }

  if (failed) {
    cacheLife({ stale: 0, revalidate: 0, expire: 0 });
  } else if (cacheMode === "historical") {
    cacheLife("dashboard_historical");
  } else {
    cacheLife("dashboard");
  }
  return result;
}

export async function getBookingsUnified(
  startDate: string,
  endDate: string,
  cacheMode: DashboardCacheMode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const cookieHeader = await buildAuthCookieHeader();
  try {
    const result = await getBookingsUnifiedCached(
      startDate,
      endDate,
      cacheMode,
      cookieHeader,
    );
    return unwrapKpiCacheResult(result);
  } catch (error) {
    if (error instanceof FetchFailedError) {
      logFetchFailed(error);
      return null;
    }
    if (error instanceof Error && error.name === "AbortError") {
      logRequestTimeout("getBookingsUnified");
      return null;
    }
    console.error("getBookingsUnified: erro inesperado", error);
    return null;
  }
}
