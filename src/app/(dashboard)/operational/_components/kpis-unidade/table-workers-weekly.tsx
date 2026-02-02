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

type WeekdayKey =
	| 'domingo'
	| 'segunda'
	| 'terca'
	| 'quarta'
	| 'quinta'
	| 'sexta'
	| 'sabado';

interface WeekdayCleaningEntry {
	averageDailyWeekCleaning: number | string;
}

interface ShiftWeekData {
	domingo?: WeekdayCleaningEntry;
	segunda?: WeekdayCleaningEntry;
	terca?: WeekdayCleaningEntry;
	quarta?: WeekdayCleaningEntry;
	quinta?: WeekdayCleaningEntry;
	sexta?: WeekdayCleaningEntry;
	sabado?: WeekdayCleaningEntry;
	totalAverageShiftCleaning: number | string;
	idealShiftMaid: number | string;
	realShiftMaid: number | string;
	difference: number | string;
}

interface TotalsWeekData {
	totalAverageDailyWeekCleaning: Record<WeekdayKey, number | string>;
	totalAllAverageShiftCleaning: number | string;
	totalIdealShiftMaid: number | string;
	totalRealShiftMaid: number | string;
	totalDifference: number | string;
}

interface WeeklyCleaningTable {
	[key: string]: ShiftWeekData | TotalsWeekData;
	Totals: TotalsWeekData;
}

interface TableWokersWeeklyProps {
	dataTable: WeeklyCleaningTable;
	idealNumber: number;
}

export default function TableWokersWeekly({
	dataTable,
	idealNumber,
}: TableWokersWeeklyProps) {
	const morningKey =
		Object.keys(dataTable).find((key) =>
			key.toLowerCase().startsWith('manh'),
		) ?? 'Manh\u00e3';
	const morning = ((dataTable as Record<string, ShiftWeekData>)[morningKey] ??
		{}) as ShiftWeekData;
	const afternoon = dataTable.Tarde as ShiftWeekData;
	const night = dataTable.Noite as ShiftWeekData;
	const totals = dataTable.Totals;

	return (
		<div>
			<div className='flex flex-col gap-5 text-balance md:flex-row items-end justify-between text-zinc-50'>
				<h2 className='font-bold text-xl mt-10'>
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
						<TableHead className='text-center lg:max-w-28  text-xs text-nowrap md:text-wrap'>
							Camareiras por turno (IDEAL)
						</TableHead>
						<TableHead className='text-center lg:max-w-28 text-xs text-nowrap md:text-wrap'>
							Camareiras por turno (REAL)
						</TableHead>
						<TableHead className='text-center text-xs '>DIF</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					<TableRow>
						<TableCell className='font-bold text-left'>Manhã</TableCell>
						<TableCell className='text-center'>
							{morning?.domingo?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{morning?.segunda?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{morning?.terca?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{morning?.quarta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{morning?.quinta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{morning?.sexta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{morning?.sabado?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{morning.totalAverageShiftCleaning}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{morning.idealShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{morning.realShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{morning.difference}
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell className='font-bold text-left'>Tarde</TableCell>
						<TableCell className='text-center'>
							{afternoon?.domingo?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{afternoon?.segunda?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{afternoon?.terca?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{afternoon?.quarta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{afternoon?.quinta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{afternoon?.sexta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{afternoon?.sabado?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{afternoon.totalAverageShiftCleaning}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{afternoon.idealShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{afternoon.realShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{afternoon.difference}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-bold text-left'>Noite</TableCell>
						<TableCell className='text-center'>
							{night?.domingo?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{night?.segunda?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{night?.terca?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{night?.quarta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{night?.quinta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{night?.sexta?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='text-center'>
							{night?.sabado?.averageDailyWeekCleaning ?? '0'}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{night.totalAverageShiftCleaning}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{night.idealShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{night.realShiftMaid}
						</TableCell>
						<TableCell className='font-bold text-center'>
							{night.difference}
						</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
					<TableRow className='text-center hover:bg-zinc-700'>
						<TableCell className='font-bold text-center'>Total</TableCell>
						<TableCell>
							{totals.totalAverageDailyWeekCleaning.domingo}
						</TableCell>
						<TableCell>
							{totals.totalAverageDailyWeekCleaning.segunda}
						</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.terca}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.quarta}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.quinta}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.sexta}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.sabado}</TableCell>

						<TableCell>{totals.totalAllAverageShiftCleaning}</TableCell>
						<TableCell>{totals.totalIdealShiftMaid}</TableCell>
						<TableCell>{totals.totalRealShiftMaid}</TableCell>
						<TableCell>{totals.totalDifference}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
