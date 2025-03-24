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
		manhã: number[];
		tarde: number[];
		noite: number[];
	}[];
};