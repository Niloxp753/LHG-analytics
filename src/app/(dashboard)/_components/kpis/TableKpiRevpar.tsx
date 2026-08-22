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
import { formatCurrency, type CurrencyConfig } from '@/lib/currency-format';

interface RevparData {
	revpar: number;
	totalRevpar: number;
}

interface CategoryRevparData {
	[day: string]: RevparData;
}

interface RevparTableEntry {
	[category: string]: CategoryRevparData;
}

interface RevparOutput {
	category: string;
	[key: string]: string | number | undefined;
}

interface TableKpiRevparProps {
	data?: RevparTableEntry[];
	currencyConfig?: CurrencyConfig;
}

export function TableKpiRevpar({ data, currencyConfig }: TableKpiRevparProps) {
	const dataTableRevparByWeek: RevparTableEntry[] | undefined = data;

	const week: { [key: string]: string } = {
		sábado: 'sabado',
		'sexta-feira': 'sexta',
		'quinta-feira': 'quinta',
		'quarta-feira': 'quarta',
		'terça-feira': 'terca',
		'segunda-feira': 'segunda',
		domingo: 'domingo',
	};

	const revparData: RevparOutput[] = [];
	const totalRevpar: { [key: string]: number } = {};

	dataTableRevparByWeek?.forEach((item, index) => {
		const category = Object.keys(item)[0];
		const weekData = item[category.toUpperCase()] as CategoryRevparData;

		const newEntry: RevparOutput = { category };

		for (const [day, values] of Object.entries(weekData)) {
			const formattedDay = week[day];
			if (formattedDay) {
				newEntry[formattedDay] = Number(values.revpar);

				if (index === 0) {
					totalRevpar[formattedDay] = Number(values.totalRevpar);
				}
			}
		}

		revparData.push(newEntry);
	});

	return (
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Revpar por Dia da Semana
			</h2>
			<Table
				title='Revpar por Dia da Semana'
				className='mt-3 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Categorias</TableHead>
					<TableHead className='text-center text-xs'>Domingo</TableHead>
					<TableHead className='text-center text-xs'>Segunda-feira</TableHead>
					<TableHead className='text-center text-xs'>Terça-feira</TableHead>
					<TableHead className='text-center text-xs '>Quarta-feira</TableHead>
					<TableHead className='text-center text-xs '>Quinta-feira</TableHead>
					<TableHead className='text-center text-xs'>Sexta-feira</TableHead>
					<TableHead className='text-center text-xs '>Sábado</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{dataTableRevparByWeek &&
					revparData.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.category}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.domingo), currencyConfig)}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.segunda), currencyConfig)}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.terca), currencyConfig)}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.quarta), currencyConfig)}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.quinta), currencyConfig)}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.sexta), currencyConfig)}
							</TableCell>
							<TableCell>
								{formatCurrency(Number(invoice.sabado), currencyConfig)}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>Total Revpar</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.domingo), currencyConfig)}
					</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.segunda), currencyConfig)}
					</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.terca), currencyConfig)}
					</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.quarta), currencyConfig)}
					</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.quinta), currencyConfig)}
					</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.sexta), currencyConfig)}
					</TableCell>
					<TableCell>
						{formatCurrency(Number(totalRevpar.sabado), currencyConfig)}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
		</div>
	);
}
