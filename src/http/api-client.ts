/** @format */

import "server-only";

import ky from "ky";

export const maxDuration = 60;

const shouldSimulate500 = process.env.SIMULATE_BACKEND_500 === "true";
const shouldSimulateTimeout = process.env.SIMULATE_BACKEND_TIMEOUT === "true";
const shouldCountFetch = process.env.DEBUG_FETCH_COUNT === "true";
const globalFetchCountKey = "__lhg_fetch_count__";
type GlobalWithFetchCount = typeof globalThis & {
  __lhg_fetch_count__?: number;
};
const incrementFetchCount = () => {
  if (!shouldCountFetch || typeof globalThis === "undefined") {
    return;
  }
  const store = globalThis as GlobalWithFetchCount;
  const current = store[globalFetchCountKey];
  store[globalFetchCountKey] = (current ?? 0) + 1;
};
const backendFetch: typeof fetch = async (input, init) => {
  incrementFetchCount();
  if (shouldSimulateTimeout) {
    const abortError = new Error("Simulated timeout");
    abortError.name = "AbortError";
    return Promise.reject(abortError);
  }
  if (!shouldSimulate500) {
    return fetch(input, init);
  }

  return new Response(
    JSON.stringify({
      message: "Simulação de erro 500 (SIMULATE_BACKEND_500=true).",
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
};

const consolidatedEndpoint =
  process.env.BACKEND_CONSOLIDATED_ENDPOINT?.trim();

if (!consolidatedEndpoint) {
  throw new Error("BACKEND_CONSOLIDATED_ENDPOINT is required");
}

export const api = ky.create({
  prefixUrl: process.env.BACKEND_ENDPOINT_IPIRANGA,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const api_lapa = ky.create({
  prefixUrl: process.env.BACKEND_ENDPOINT_LAPA,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const api_andar_de_cima = ky.create({
  prefixUrl: process.env.BACKEND_ENDPOINT_ANDAR_DE_CIMA,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const api_tout = ky.create({
  prefixUrl: process.env.BACKEND_ENDPOINT_TOUT,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const api_liv = ky.create({
  prefixUrl: process.env.BACKEND_ENDPOINT_LIV,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const api_altana = ky.create({
  prefixUrl: process.env.BACKEND_ENDPOINT_ALTANA,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const auth_api = ky.create({
  prefixUrl: process.env.BACKEND_AUTH_ENDPOINT,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});

export const consolidated_api = ky.create({
  prefixUrl: consolidatedEndpoint,
  timeout: 60000,
  retry: 0,
  mode: "cors",
  fetch: backendFetch,
});
