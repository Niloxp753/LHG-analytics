/** @format */

export type ShiftType = 'Manhã' | 'Tarde' | 'Noite';

export type ShiftSeriesItem = {
	name: string;
	data: number[];
};

export type ShiftSeries = ShiftSeriesItem[];

export type ShiftCleaning = {
	categories: string[];
	Manhã: ShiftSeries;
	Tarde: ShiftSeries;
	Noite: ShiftSeries;
};
