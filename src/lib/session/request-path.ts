export const DASHBOARD_REQUEST_PATH_HEADER = 'x-lhg-request-path';

export function buildInternalRequestPath(pathname: string, search: string): string {
	return `${pathname}${search}`;
}
