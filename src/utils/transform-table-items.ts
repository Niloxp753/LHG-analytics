/** @format */

export type SellingItems = {
	categories: string[];
	series: number[];
};

export type TransformedItem = {
	id: number;
	items: string;
	sells: number;
};

export function transformBestSellingItems(
	data: SellingItems,
): TransformedItem[] {
	return data.categories.map((category, index) => ({
		id: index + 1,
		items: category,
		sells: data.series[index],
	}));
}
