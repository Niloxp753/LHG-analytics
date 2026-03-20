/** @format */

import { AUTH_CACHE_TAGS } from "@/lib/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AUTH_PATHS_TO_REVALIDATE = [
  "/settings",
  "/general",
  "/operational",
  "/reservations",
  "/restaurant",
] as const;

function buildCookieHeader(request: NextRequest): string | null {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const parts = [
    accessToken ? `access_token=${accessToken}` : null,
    refreshToken ? `refresh_token=${refreshToken}` : null,
  ].filter(Boolean);

  return parts.length ? parts.join("; ") : null;
}

function getSetCookies(headers: Headers): string[] {
  const anyHeaders = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === "function") {
    return anyHeaders.getSetCookie();
  }

  const combined = headers.get("set-cookie");
  return combined ? [combined] : [];
}

function expireAuthCookies(response: NextResponse) {
  response.cookies.set({
    name: "access_token",
    value: "",
    maxAge: 0,
    path: "/",
  });
  response.cookies.set({
    name: "refresh_token",
    value: "",
    maxAge: 0,
    path: "/",
  });
}

function resolveUpstreamLogoutUrl(request: NextRequest): string | null {
  const explicitAuthApi = process.env.BACKEND_AUTH_ENDPOINT?.trim();
  const publicAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL?.trim();

  let baseApi = explicitAuthApi;
  if (!baseApi && publicAuthUrl) {
    const normalizedPublicAuth = publicAuthUrl.replace(/\/+$/, "");
    baseApi = `${normalizedPublicAuth}/api`;
  }

  try {
    const normalizedBase = baseApi?.endsWith("/") ? baseApi : `${baseApi}/`;
    const target = new URL("logout", normalizedBase);
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
    const cookieHeader = buildCookieHeader(request);
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

  for (const setCookie of upstreamSetCookies) {
    response.headers.append("set-cookie", setCookie);
  }

  expireAuthCookies(response);
  return response;
}
