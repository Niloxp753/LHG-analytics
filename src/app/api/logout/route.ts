/** @format */

import { AUTH_CACHE_TAGS } from "@/lib/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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

function isLocalHost(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  return normalized === "localhost" || normalized === "127.0.0.1";
}

function isLikelyIpAddress(hostname: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
}

function resolveRegistrableDomain(hostname: string): string | null {
  const labels = hostname
    .trim()
    .toLowerCase()
    .split(".")
    .filter(Boolean);

  if (labels.length < 2) {
    return null;
  }

  const tld = labels[labels.length - 1];
  const secondLevel = labels[labels.length - 2];
  const usesSecondLevelTld =
    tld.length === 2 &&
    ["com", "net", "org", "gov", "edu", "co"].includes(secondLevel);

  if (usesSecondLevelTld) {
    if (labels.length >= 3) {
      return labels.slice(-3).join(".");
    }
    return labels.join(".");
  }

  return labels.slice(-2).join(".");
}

function getCandidateCookieDomains(request: NextRequest): string[] {
  const domains = new Set<string>();

  const addDomainCandidates = (rawHostname?: string | null) => {
    if (!rawHostname) {
      return;
    }
    const hostname = rawHostname.trim().toLowerCase();
    if (!hostname || isLocalHost(hostname) || isLikelyIpAddress(hostname)) {
      return;
    }

    domains.add(hostname);
    const registrable = resolveRegistrableDomain(hostname);
    if (registrable) {
      domains.add(registrable);
    }
  };

  addDomainCandidates(request.nextUrl.hostname);

  const explicitAuthApi = process.env.BACKEND_AUTH_ENDPOINT?.trim();
  const publicAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL?.trim();

  for (const rawUrl of [explicitAuthApi, publicAuthUrl]) {
    if (!rawUrl) {
      continue;
    }
    try {
      addDomainCandidates(new URL(rawUrl).hostname);
    } catch {
      // Ignore invalid URL values and keep best-effort cookie cleanup.
    }
  }

  return Array.from(domains);
}

function expireAuthCookies(response: NextResponse, request: NextRequest) {
  const secure = request.nextUrl.protocol === "https:";
  const domainCandidates = getCandidateCookieDomains(request);

  const appendExpiredCookie = (
    name: "access_token" | "refresh_token",
    domain?: string,
  ) => {
    const parts = [
      `${name}=`,
      "Path=/",
      "Max-Age=0",
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "HttpOnly",
      "SameSite=Lax",
    ];
    if (secure) {
      parts.push("Secure");
    }
    if (domain) {
      parts.push(`Domain=${domain}`);
    }
    response.headers.append("set-cookie", parts.join("; "));
  };

  appendExpiredCookie("access_token");
  appendExpiredCookie("refresh_token");

  for (const domain of domainCandidates) {
    appendExpiredCookie("access_token", domain);
    appendExpiredCookie("refresh_token", domain);
  }
}

function normalizeAuthApiBase(rawBaseUrl: string): string {
  const normalized = rawBaseUrl.replace(/\/+$/, "");
  return normalized.endsWith("/api") ? normalized : `${normalized}/api`;
}

function resolveUpstreamLogoutUrl(request: NextRequest): string | null {
  const explicitAuthApi = process.env.BACKEND_AUTH_ENDPOINT?.trim();
  const publicAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL?.trim();

  let baseApi: string | undefined;
  if (explicitAuthApi) {
    baseApi = normalizeAuthApiBase(explicitAuthApi);
  } else if (publicAuthUrl) {
    baseApi = normalizeAuthApiBase(publicAuthUrl);
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
  response.headers.set("cache-control", "no-store, no-cache, private, max-age=0");

  for (const setCookie of upstreamSetCookies) {
    response.headers.append("set-cookie", setCookie);
  }

  expireAuthCookies(response, request);
  return response;
}
