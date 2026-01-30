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

interface TableWokersWeeklyProps {
	dataTable: any;
	idealNumber: number;
}

export default function TableWokersWeekly({
	dataTable,
	idealNumber,
}: TableWokersWeeklyProps) {
	return (
		<div>
			<div className='flex flex-col gap-5 text-balance md:flex-row items-baseline justify-between text-zinc-50'>
				<h2 className='font-bold text-xl  md:text-3xl mt-10'>
					Dimensionamento de Equipe - Semanal
				</h2>
				<p className='border border-violet-400 rounded-lg p-4'>
					Número ideal de suítes limpas:{' '}
					<strong className='text-lg'>{idealNumber}</strong>
				</p>
			</div>
			<Table
				title='Dimensionamento de Equipe - Semanal'
				className='mt-5 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Horário</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Domingo
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Segunda-Feira
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Terça-Feira
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Quarta-Feira
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Quinta-Feira
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Sexta-Feira
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Sábado
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Média
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Camareiras por turno (IDEAL)
						</TableHead>
						<TableHead className='text-center text-xs text-nowrap'>
							Camareiras por turno (REAL)
						</TableHead>
						<TableHead className='text-center text-xs '>DIF</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					<TableRow>
						<TableCell className='font-bold text-left'>Manhã</TableCell>
						<TableCell className='text-center'>
							{dataTable.Manhã?.domingo?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Manhã?.segunda?.averageDailyWeekCleaning ?? '0'}
						</TableCell>{' '}
						<TableCell className='text-center'>
							{dataTable.Manhã?.terca?.averageDailyWeekCleaning ?? '0'}
						</TableCell>{' '}
						<TableCell className='text-center'>
							{dataTable.Manhã?.quarta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>{' '}
						<TableCell className='text-center'>
							{dataTable.Manhã?.quinta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>{' '}
						<TableCell className='text-center'>
							{dataTable.Manhã?.sexta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>{' '}
						<TableCell className='text-center'>
							{dataTable.Manhã?.sabado?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
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
						<TableCell className='text-center'>
							{dataTable.Tarde?.domingo?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Tarde?.segunda?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Tarde?.terca?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Tarde?.quarta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Tarde?.quinta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Tarde?.sexta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Tarde?.sabado?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
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
						<TableCell className='text-center'>
							{dataTable.Noite?.domingo?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Noite?.segunda?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Noite?.terca?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Noite?.quarta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Noite?.quinta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Noite?.sexta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{dataTable.Noite?.sabado?.averageDailyWeekCleaning ?? '0'}
						</TableCell>{' '}
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
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.domingo}
						</TableCell>
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.segunda}
						</TableCell>
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.terca}
						</TableCell>
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.quarta}
						</TableCell>
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.quinta}
						</TableCell>
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.sexta}
						</TableCell>
						<TableCell>
							{dataTable.Totals.totalAverageDailyWeekCleaning.sabado}
						</TableCell>

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
