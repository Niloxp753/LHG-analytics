/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';

interface WorkerCleaningEntry {
	employeeName: string;
	totalSuitesCleanings: number;
	totalDaysWorked: number;
	averageDailyCleaning: number;
}

interface TableWokersNightProps {
	dataTable?: WorkerCleaningEntry[] | null;
}

export default function TableWokersNight({ dataTable }: TableWokersNightProps) {
	return (
		<div>
			<h2 className='font-bold text-zinc-50 text-xl md:text-3xl mt-10'>
				Relatório de Colaboradores - Noite
			</h2>
			<Table
				title='Colaboradores da Noite'
				className='mt-5 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Colaborador</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Total de Suítes
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Dias Trabalhados
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Média de Limpezas por Dia
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
						dataTable.map((data, index) => (
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
