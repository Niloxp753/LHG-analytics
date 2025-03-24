/** @format */

import {
	EmployeeCleaningByShift,
	ShiftType,
	TransformedData,
} from '@/app/(dashboard)/operational/types';

export function transformData(input: EmployeeCleaningByShift): TransformedData {
	const categories = input.categories;

	const shiftKeys: ShiftType[] = ['Manhã', 'Tarde', 'Noite'];
	const totalDays = categories.length;

	const accumulatedSeries = shiftKeys.reduce((acc, shift) => {
		acc[shift.toLowerCase() as 'manhã' | 'tarde' | 'noite'] = new Array(
			totalDays,
		).fill(0);
		return acc;
	}, {} as { manhã: number[]; tarde: number[]; noite: number[] });

	input.series.forEach((shiftData) => {
		Object.entries(shiftData).forEach(([shift, employees]) => {
			if (shiftKeys.includes(shift as ShiftType)) {
				employees.forEach((employee) => {
					employee.data.forEach((value, index) => {
						accumulatedSeries[
							shift.toLowerCase() as 'manhã' | 'tarde' | 'noite'
						][index] += value;
					});
				});
			}
		});
	});

	return {
		categories,
		series: [accumulatedSeries],
	};
}
