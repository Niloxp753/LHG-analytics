/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/_components/ui/table';
import React from 'react';

export default function TableWokersMorning() {
	const data = [
		{
			name: 'Marcos Pereira',
			totalSuite: 198,
			daysOfWork: 24,
			daysOfSlack: 4,
			daysOfCompensatorySlack: 1,
			daysOfFouls: 2,
			daysOfVacation: 0,
		},
		{
			name: 'Ana Cristina',
			totalSuite: 162,
			daysOfWork: 26,
			daysOfSlack: 5,
			daysOfCompensatorySlack: 0,
			daysOfFouls: 1,
			daysOfVacation: 0,
		},
		{
			name: 'Ricardo Sousa',
			totalSuite: 143,
			daysOfWork: 22,
			daysOfSlack: 3,
			daysOfCompensatorySlack: 0,
			daysOfFouls: 3,
			daysOfVacation: 2,
		},
		{
			name: 'Fabiana Oliveira',
			totalSuite: 189,
			daysOfWork: 27,
			daysOfSlack: 4,
			daysOfCompensatorySlack: 1,
			daysOfFouls: 0,
			daysOfVacation: 0,
		},
		{
			name: 'Carlos Mendes',
			totalSuite: 176,
			daysOfWork: 25,
			daysOfSlack: 6,
			daysOfCompensatorySlack: 0,
			daysOfFouls: 2,
			daysOfVacation: 0,
		},
		{
			name: 'Patrícia Costa',
			totalSuite: 153,
			daysOfWork: 28,
			daysOfSlack: 3,
			daysOfCompensatorySlack: 1,
			daysOfFouls: 0,
			daysOfVacation: 0,
		},
		{
			name: 'Jorge Santos',
			totalSuite: 167,
			daysOfWork: 23,
			daysOfSlack: 5,
			daysOfCompensatorySlack: 0,
			daysOfFouls: 1,
			daysOfVacation: 1,
		},
	];

	const total = {
		name: 'Valor Total',
		totalSuite: 1188,
		daysOfWork: 175,
		daysOfSlack: 30,
		daysOfCompensatorySlack: 3,
		daysOfFouls: 9,
		daysOfVacation: 3,
	};

	return (
		<div>
			<h2 className='font-bold text-zinc-50 text-3xl mt-10'>
				Relatório de colaboradores - Manhã
			</h2>
			<Table
				title='Colaboradores da manhã'
				className='mt-5 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Colaborador</TableHead>
						<TableHead className='text-center text-xs'>
							Total de suítes
						</TableHead>
						<TableHead className='text-center text-xs'>
							Dias trabalhados
						</TableHead>
						<TableHead className='text-center text-xs'>
							Média de limpezas por dia
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					{data.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.name}
							</TableCell>
							<TableCell>{invoice.totalSuite}</TableCell>
							<TableCell>{invoice.daysOfWork}</TableCell>
							<TableCell>
								{Number(invoice.totalSuite / invoice.daysOfWork).toFixed()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
					<TableRow className='text-center hover:bg-zinc-700'>
						<TableCell>{total.name}</TableCell>
						<TableCell>{total.totalSuite}</TableCell>
						<TableCell>{total.daysOfWork}</TableCell>
						<TableCell>
							{Number(total.totalSuite / total.daysOfWork).toFixed()}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
