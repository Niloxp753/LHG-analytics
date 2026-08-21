import { FetchFailedError } from './conditional-cache';

const KPI_CACHE_FAILURE = '__lhg_kpi_cache_failure__';

function hashCacheIdentity(value: string) {
	let hash = 2166136261;
	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(36);
}

export function getKpiCacheIdentityTag(
	name: string,
	...parts: Array<string | null | undefined>
) {
	return `lhg:kpi:${name}:${hashCacheIdentity(parts.join('\u001f'))}`;
}

export type KpiCacheFailure = {
	[KPI_CACHE_FAILURE]: true;
	requestName: string;
	kind: 'fetch' | 'abort' | 'unexpected';
	message?: string;
	status?: number;
	statusText?: string;
};

export function captureKpiCacheFailure(
	error: unknown,
	requestName: string,
): KpiCacheFailure {
	if (error instanceof FetchFailedError) {
		return {
			[KPI_CACHE_FAILURE]: true,
			requestName,
			kind: 'fetch',
			status: error.status,
			statusText: error.statusText,
		};
	}

	if (error instanceof Error && error.name === 'AbortError') {
		return {
			[KPI_CACHE_FAILURE]: true,
			requestName,
			kind: 'abort',
		};
	}

	return {
		[KPI_CACHE_FAILURE]: true,
		requestName,
		kind: 'unexpected',
		message: error instanceof Error ? error.message : String(error),
	};
}

export function unwrapKpiCacheResult<T>(
	result: T | KpiCacheFailure,
): T {
	if (
		result &&
		typeof result === 'object' &&
		(result as Partial<KpiCacheFailure>)[KPI_CACHE_FAILURE] === true
	) {
		const failure = result as KpiCacheFailure;
		if (failure.kind === 'fetch') {
			throw new FetchFailedError(
				failure.requestName,
				failure.status,
				failure.statusText,
			);
		}
		if (failure.kind === 'abort') {
			const error = new Error(`${failure.requestName}: request timeout`);
			error.name = 'AbortError';
			throw error;
		}
		throw new Error(failure.message ?? `${failure.requestName}: erro inesperado`);
	}

	return result as T;
}
