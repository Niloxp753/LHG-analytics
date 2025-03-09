/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';

interface TableWokersNightProps {
	dataTable: any;
}

export default function TableWokersNight({ dataTable }: TableWokersNightProps) {
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
			<h2 className='font-bold text-zinc-50 text-xl md:text-3xl mt-10'>
				Relatório de colaboradores - Noite
			</h2>
			<Table
				title='Colaboradores da Noite'
				className='mt-5 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Colaborador</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Total de suítes
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Dias trabalhados
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Média de limpezas por dia
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					{!dataTable ? (
						<TableRow>
							<TableCell className='font-bold text-left text-nowrap'>
								Dados não encontrados
							</TableCell>
						</TableRow>
					) : (
						dataTable.map((data: any, index: number) => (
							<TableRow
								key={index}
								className='text-center'>
								<TableCell className='font-bold text-left text-nowrap'>
									{data.employeeName}
								</TableCell>
								<TableCell>{data.totalSuitesCleanings}</TableCell>
								<TableCell>{data.totalDaysWorked}</TableCell>
								<TableCell>{data.averageDailyCleaning}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
				{/* <TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
					<TableRow className='text-center hover:bg-zinc-700'>
						<TableCell>{total.name}</TableCell>
						<TableCell>{total.totalSuite}</TableCell>
						<TableCell>{total.daysOfWork}</TableCell>
						<TableCell>
							{Number(total.totalSuite / total.daysOfWork).toFixed()}
						</TableCell>
					</TableRow>
				</TableFooter> */}
			</Table>
		</div>
	);
}
