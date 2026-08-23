/** @format */

import { AUTH_CACHE_TAGS } from "@/lib/cache-tags";
import {
  appendSetCookies,
  buildCookieHeader,
  expireAuthCookies,
  getSetCookies,
} from "@/lib/auth-cookie";
import { resolveAuthApiUrl } from "@/lib/auth-url";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const AUTH_PATHS_TO_REVALIDATE = [
  "/settings",
  "/general",
  "/operational",
  "/reservations",
  "/restaurant",
] as const;

function resolveUpstreamLogoutUrl(request: NextRequest): string | null {
  try {
    const upstreamLogoutUrl = resolveAuthApiUrl("logout");
    if (!upstreamLogoutUrl) {
      return null;
    }

    const target = new URL(upstreamLogoutUrl);
    const current = new URL(request.url);

    if (
      target.origin === current.origin &&
      target.pathname === current.pathname
    ) {
      return null;
    }

    return target.toString();
  } catch {
    return null;
  }
}

function invalidateAuthenticatedCache() {
  for (const tag of AUTH_CACHE_TAGS) {
    revalidateTag(tag, { expire: 0 });
  }

  for (const path of AUTH_PATHS_TO_REVALIDATE) {
    revalidatePath(path);
  }
}

export async function POST(request: NextRequest) {
  let upstreamOk = true;
  let upstreamStatus: number | undefined;
  let upstreamSetCookies: string[] = [];

  if (process.env.DISABLE_AUTH_COOKIES !== "true") {
    const upstreamLogoutUrl = resolveUpstreamLogoutUrl(request);
    const cookieHeader = buildCookieHeader(
      request.cookies.get("access_token")?.value,
      request.cookies.get("refresh_token")?.value,
    );
    const headers: Record<string, string> = { accept: "application/json" };
    if (cookieHeader) {
      headers.cookie = cookieHeader;
    }

    if (!upstreamLogoutUrl) {
      upstreamOk = false;
      console.error(
        "logout route: upstream logout URL is invalid or recursive",
      );
    } else {
      try {
        const upstreamResp = await fetch(upstreamLogoutUrl, {
          method: "POST",
          headers,
          cache: "no-store",
          signal: AbortSignal.timeout(5000),
        });

        upstreamOk = upstreamResp.ok;
        upstreamStatus = upstreamResp.status;
        upstreamSetCookies = getSetCookies(upstreamResp.headers);
      } catch (error) {
        upstreamOk = false;
        console.error("logout route: upstream logout failed", error);
      }
    }
  }

  try {
    invalidateAuthenticatedCache();
  } catch (error) {
    upstreamOk = false;
    console.error("logout route: cache invalidation failed", error);
  }

  const body: { ok: boolean; upstreamStatus?: number } = { ok: upstreamOk };
  if (typeof upstreamStatus === "number") {
    body.upstreamStatus = upstreamStatus;
  }

  const response = NextResponse.json(body);
  response.headers.set("cache-control", "no-store, no-cache, private, max-age=0");

  appendSetCookies(response, upstreamSetCookies);

  expireAuthCookies(response, request);
  return response;
}
