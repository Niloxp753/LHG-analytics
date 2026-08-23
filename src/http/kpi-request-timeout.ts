export const DEFAULT_KPI_REQUEST_TIMEOUT_MS = 30_000;

export function getKpiRequestTimeoutMs() {
	const configured = Number(process.env.KPI_REQUEST_TIMEOUT_MS);
	return Number.isFinite(configured) && configured > 0
		? configured
		: DEFAULT_KPI_REQUEST_TIMEOUT_MS;
}

export async function withKpiRequestTimeout<T>(
	operation: Promise<T>,
	controller: AbortController,
): Promise<T> {
	const timeout = setTimeout(() => {
		const error = new Error('KPI request timeout');
		error.name = 'AbortError';
		controller.abort(error);
	}, getKpiRequestTimeoutMs());

	try {
		return await operation;
	} finally {
		clearTimeout(timeout);
	}
}
