/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { formatCurrency, type CurrencyConfig } from '@/lib/currency-format';
import { TrendingUp } from 'lucide-react';

type SellingItems = {
	name: string;
	totalRevenue: number;
	totalSales: number;
	totalRepresentation: number;
};

interface DataProps {
	data: SellingItems[];
	currencyConfig?: CurrencyConfig;
}

export function MostSell({ data, currencyConfig }: DataProps) {
	return (
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Alimentos Mais Vendidos
			</h2>
			<Table className='mt-3 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead className='flex items-center gap-2'>
						Alimentos Mais Vendidos
						<TrendingUp size={16} />
					</TableHead>
					<TableHead className='text-center'>Faturamento</TableHead>
					<TableHead className='text-center'>Vendas</TableHead>
					<TableHead className='text-center'>Representatividade</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{data.map((invoice, index) => (
					<TableRow
						key={index}
						className='text-center'>
						<TableCell
							title={invoice.name}
							className='text-xs max-w-48 text-left capitalize truncate '>
							{invoice.name}
						</TableCell>
						<TableCell>
							{formatCurrency(invoice.totalRevenue, currencyConfig)}
						</TableCell>
						<TableCell>{invoice.totalSales}</TableCell>
						<TableCell>{invoice.totalRepresentation}%</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</div>
	);
}
