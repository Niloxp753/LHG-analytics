/** @format */

export type EmployeeData = {
	name: string;
	data: number[];
};

export type ShiftType = 'Manhã' | 'Tarde' | 'Noite';

export type Shift = {
	[key in ShiftType]?: EmployeeData[];
};

export type EmployeeCleaningByShift = {
	categories: string[];
	series: Shift[];
};

export type TransformedData = {
	categories: string[];
	series: {
		Manhã: number[];
		tarde: number[];
		noite: number[];
	};
};

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
