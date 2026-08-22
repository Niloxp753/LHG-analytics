export function resolvePairedBarChartHeight(
	...categoryGroups: Array<string[] | null | undefined>
) {
	const largestCategoryCount = Math.max(
		0,
		...categoryGroups.map((categories) => categories?.length ?? 0),
	);

	return Math.max(240, 112 + largestCategoryCount * 56);
}
