/** @format */

import { isRetryableStatus } from "./retry";

const isDevelopment = process.env.NODE_ENV === "development";

function isHandledUnexpectedPayload(statusText?: string): boolean {
  return (
    statusText?.startsWith("Unexpected content-type:") === true ||
    statusText === "Invalid JSON response"
  );
}

export function logFetchFailed(error: {
  message: string;
  status?: number;
  statusText?: string;
}): void {
  const status = error.status;
  const isRetryable = typeof status === "number" && isRetryableStatus(status);
  const log =
    isDevelopment && (isRetryable || isHandledUnexpectedPayload(error.statusText))
      ? console.warn
      : console.error;

  log(`${error.message}: erro ao buscar dados`, error.status, error.statusText);
}

export function logRequestTimeout(name: string): void {
  const log = isDevelopment ? console.warn : console.error;
  log(`${name}: request timeout`);
}
