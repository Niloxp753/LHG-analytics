/** @format */

import { EmployeeData } from '@/app/(dashboard)/operational/types';

export function accumulateEmployeeData(employees: EmployeeData[]): number[] {
	if (!employees || employees.length === 0) {
		return [];
	}

	// Pega o tamanho do primeiro array de data para criar o array de resultado
	const dataLength = employees[0].data.length;
	const accumulatedData = new Array(dataLength).fill(0);

	// Soma todos os valores de data de todos os funcionários
	employees.forEach((employee) => {
		employee.data.forEach((value, index) => {
			accumulatedData[index] += value;
		});
	});

	return accumulatedData;
}
