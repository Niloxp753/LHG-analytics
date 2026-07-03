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
import { buildWeeklyCleaningRows } from './operational-shifts';

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
	totalAverageDailyWeekCleaning: Partial<Record<WeekdayKey, number | string>>;
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
	const rows = buildWeeklyCleaningRows(dataTable as Record<string, unknown>).map(
		(row) => ({
			...row,
			data: (row.data ?? {}) as Partial<ShiftWeekData>,
		}),
	);
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
						<TableHead className='text-center lg:max-w-28 text-xs text-nowrap md:text-wrap'>
							Camareiras por turno (IDEAL)
						</TableHead>
						<TableHead className='text-center lg:max-w-28 text-xs text-nowrap md:text-wrap'>
							Camareiras por turno (REAL)
						</TableHead>
						<TableHead className='text-center text-xs'>DIF</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					{rows.map((row) => (
						<TableRow key={row.key}>
							<TableCell className='font-bold text-left'>{row.label}</TableCell>
							<TableCell className='text-center'>
								{row.data.domingo?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='text-center'>
								{row.data.segunda?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='text-center'>
								{row.data.terca?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='text-center'>
								{row.data.quarta?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='text-center'>
								{row.data.quinta?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='text-center'>
								{row.data.sexta?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='text-center'>
								{row.data.sabado?.averageDailyWeekCleaning ?? '0'}
							</TableCell>
							<TableCell className='font-bold text-center'>
								{row.data.totalAverageShiftCleaning ?? '0'}
							</TableCell>
							<TableCell className='font-bold text-center'>
								{row.data.idealShiftMaid ?? '0'}
							</TableCell>
							<TableCell className='font-bold text-center'>
								{row.data.realShiftMaid ?? '0'}
							</TableCell>
							<TableCell className='font-bold text-center'>
								{row.data.difference ?? '0'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className='text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
					<TableRow className='text-center hover:bg-zinc-700'>
						<TableCell className='font-bold text-center'>Total</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.domingo ?? '0'}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.segunda ?? '0'}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.terca ?? '0'}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.quarta ?? '0'}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.quinta ?? '0'}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.sexta ?? '0'}</TableCell>
						<TableCell>{totals.totalAverageDailyWeekCleaning.sabado ?? '0'}</TableCell>
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
