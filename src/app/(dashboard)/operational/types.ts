/** @format */

export type ShiftType = 'Manhã' | 'Tarde' | 'Noite';

export type UnitName = 'Lush Ipiranga' | 'Lush Lapa' | 'Tout' | 'Andar de Cima';

export type ShiftSeriesItem = {
	name: ShiftType;
	data: number[];
};

export type ShiftSeries = ShiftSeriesItem[];

export type ShiftCleaningSeriesByUnit = Record<UnitName, ShiftSeries>;

export type ShiftCleaning = {
	categories: string[];
	series: ShiftCleaningSeriesByUnit;
};
