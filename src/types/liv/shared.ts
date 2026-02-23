/** @format */

export type CategoriesSeries = {
	categories: string[];
	series: number[];
};

export type NamedSeriesItem = {
	name: string;
	data: number[];
};

export type CategoriesNamedSeries = {
	categories: string[];
	series: NamedSeriesItem[];
};

