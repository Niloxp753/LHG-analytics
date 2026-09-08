export function sortUnitComparison(
	categories: readonly string[],
	series: readonly number[],
) {
	if (categories.length !== series.length) {
		return { categories: [...categories], series: [...series] };
	}
	const ranked = series
		.map((value, index) => ({ value, index }))
		.sort((a, b) => b.value - a.value);
	return {
		categories: ranked.map(({ index }) => categories[index]),
		series: ranked.map(({ value }) => value),
	};
}
