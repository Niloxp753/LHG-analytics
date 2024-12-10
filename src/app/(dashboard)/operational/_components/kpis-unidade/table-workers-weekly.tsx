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

interface TableWokersWeeklyProps {
	dataTable: any;
}

export default function TableWokersWeekly({
	dataTable,
}: TableWokersWeeklyProps) {
	return (
		<div>
			<div className='flex flex-col gap-5 text-balance md:flex-row items-baseline justify-between text-zinc-50'>
				<h2 className='font-bold  text-3xl mt-10'>
					Dimensionamento de equipe - Semanal
				</h2>
				<p className='border border-violet-400 rounded-lg p-4'>
					Número ideal de suítes limpas: <strong className='text-lg'>7</strong>
				</p>
			</div>
			<Table
				title='Dimensionamento de equipe - Semanal'
				className='mt-5 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Horário</TableHead>
						<TableHead className='text-center text-xs '>Domingo</TableHead>
						<TableHead className='text-center text-xs '>
							Segunda-Feira
						</TableHead>
						<TableHead className='text-center text-xs'>Terça-Feira</TableHead>
						<TableHead className='text-center text-xs '>Quarta-Feira</TableHead>
						<TableHead className='text-center text-xs '>Quinta-Feira</TableHead>
						<TableHead className='text-center text-xs'>Sexta-Feira</TableHead>
						<TableHead className='text-center text-xs '>Sábado</TableHead>
						<TableHead className='text-center text-xs '>Média</TableHead>
						<TableHead className='text-center text-xs '>
							Camareiras por turno (IDEAL)
						</TableHead>
						<TableHead className='text-center text-xs '>
							Camareiras por turno (REAL)
						</TableHead>
						<TableHead className='text-center text-xs '>DIF</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					<TableRow>
						<TableCell className='font-bold text-left'>Manhã</TableCell>
						{dataTable.Manhã.days.map((d: any, index: number) => {
							return (
								<TableCell
									className='font-bold text-center'
									key={index}>
									{d.averageDailyWeekCleaning}
								</TableCell>
							);
						})}
						<TableCell className='font-bold text-center'>
							{dataTable.Manhã.totalAverageShiftCleaning}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Manhã.idealShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Manhã.realShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Manhã.difference}
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell className='font-bold text-left'>Tarde</TableCell>
						{dataTable.Tarde.days.map((d: any, index: number) => {
							return (
								<TableCell
									className='font-bold text-center'
									key={index}>
									{d.averageDailyWeekCleaning}
								</TableCell>
							);
						})}
						<TableCell className='font-bold text-center'>
							{dataTable.Tarde.totalAverageShiftCleaning}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Tarde.idealShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Tarde.realShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Tarde.difference}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold text-left'>Noite</TableCell>
						{dataTable.Noite.days.map((d: any, index: number) => {
							return (
								<TableCell
									className='font-bold text-center'
									key={index}>
									{d.averageDailyWeekCleaning}
								</TableCell>
							);
						})}
						<TableCell className='font-bold text-center'>
							{dataTable.Noite.totalAverageShiftCleaning}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Noite.idealShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Noite.realShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{dataTable.Noite.difference}
						</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
					<TableRow className='text-center hover:bg-zinc-700'>
						<TableCell className='font-bold text-center'>Total</TableCell>
						{dataTable.Totals.totalAverageDailyWeekCleaning.map(
							(d: any, index: number) => {
								return <TableCell key={index}>{d.totalCleanings}</TableCell>;
							},
						)}
						<TableCell>
							{dataTable.Totals.totalAllAverageShiftCleaning}
						</TableCell>
						<TableCell>{dataTable.Totals.totalIdealShiftMaid}</TableCell>
						<TableCell>{dataTable.Totals.totalRealShiftMaid}</TableCell>
						<TableCell>{dataTable.Totals.totalDifference}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
