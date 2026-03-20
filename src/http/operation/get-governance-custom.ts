/** @format */

import { buildAuthCookieHeader } from "@/lib/auth-headers";
import { api, api_andar_de_cima, api_lapa, api_tout } from "../api-client";
import { FetchFailedError } from "../conditional-cache";
import { applyPrivateDashboardCache } from "../cache-profiles";
import { logFetchFailed, logRequestTimeout } from "../logging";
import { isRetryableError, isRetryableStatus } from "../retry";

async function fetchGovernanceKpis(
  client: typeof api,
  startDate: string,
  endDate: string,
  authHeaders: Record<string, string> | undefined,
  controller: AbortController,
): Promise<Response | null> {
  let resp: Response | null = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      resp = await client.get("Governance/kpis/date-range", {
        searchParams: { startDate, endDate },
        headers: authHeaders,
        signal: controller.signal,
        throwHttpErrors: false,
      });

      if (resp.ok || !isRetryableStatus(resp.status) || attempt === 1) {
        break;
      }
    } catch (error) {
      if (!isRetryableError(error) || attempt === 1) {
        throw error;
      }
    }
  }
  return resp;
}

async function getOperationCustomCached(
  startDate: string,
  endDate: string,
  company: string | undefined,
  cookieHeader: string | null,
) {
  "use cache: private";

  applyPrivateDashboardCache(["operational"], "dashboard");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

  try {
    const companyKey = company ?? "ipiranga";
    let resp: Response | null = null;
    switch (companyKey) {
      case "andar_de_cima":
        resp = await fetchGovernanceKpis(
          api_andar_de_cima,
          startDate,
          endDate,
          authHeaders,
          controller,
        );
        break;
      case "lapa":
        resp = await fetchGovernanceKpis(
          api_lapa,
          startDate,
          endDate,
          authHeaders,
          controller,
        );
        break;
      default:
        resp = await fetchGovernanceKpis(
          api,
          startDate,
          endDate,
          authHeaders,
          controller,
        );
        break;
    }

    if (!resp || !resp.ok) {
      throw new FetchFailedError(
        `getOperationCustom (${companyKey})`,
        resp?.status,
        resp?.statusText,
      );
    }

    return resp.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function getOperationCustomToutUncached(
  startDate: string,
  endDate: string,
  cookieHeader: string | null,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

  try {
    const resp = await fetchGovernanceKpis(
      api_tout,
      startDate,
      endDate,
      authHeaders,
      controller,
    );

    if (!resp || !resp.ok) {
      throw new FetchFailedError(
        "getOperationCustom (tout)",
        resp?.status,
        resp?.statusText,
      );
    }

    return resp.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function getOperationCustom(
  startDate: string,
  endDate: string,
  company?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const cookieHeader = await buildAuthCookieHeader();

  try {
    const companyKey = company ?? "ipiranga";
    if (companyKey === "tout") {
      return await getOperationCustomToutUncached(
        startDate,
        endDate,
        cookieHeader,
      );
    }

    return await getOperationCustomCached(
      startDate,
      endDate,
      company,
      cookieHeader,
    );
  } catch (error) {
    if (error instanceof FetchFailedError) {
      logFetchFailed(error);
      return null;
    }
    if (error instanceof Error && error.name === "AbortError") {
      logRequestTimeout("getOperationCustom");
      return null;
    }
    console.error("getOperationCustom: erro inesperado", error);
    return null;
  }
}
