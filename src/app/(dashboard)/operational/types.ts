/** @format */

export type ShiftType = 'Manhã' | 'Tarde' | 'Noite';

export type UnitName = 'Lush Ipiranga' | 'Lush Lapa' | 'Tout' | 'Andar de Cima';

export type ShiftSeriesItem = {
	name: UnitName;
	data: number[];
};

export type ShiftSeries = ShiftSeriesItem[];

export type ShiftCleaning = {
	categories: string[];
	Manhã: ShiftSeries;
	Tarde: ShiftSeries;
	Noite: ShiftSeries;
};
