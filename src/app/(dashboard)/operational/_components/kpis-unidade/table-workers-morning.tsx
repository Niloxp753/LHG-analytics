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

interface TableWokersMorningProps {
	dataTable: any;
}

export default function TableWokersMorning({
	dataTable,
}: TableWokersMorningProps) {
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
					{/* {dataTable?.map((data: any, index: number) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>{data.name}</TableCell>
							<TableCell>{data.totalSuite}</TableCell>
							<TableCell>{data.daysOfWork}</TableCell>
							<TableCell>
								{Number(data.totalSuite / data.daysOfWork).toFixed()}
							</TableCell>
						</TableRow>
					))} */}
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
