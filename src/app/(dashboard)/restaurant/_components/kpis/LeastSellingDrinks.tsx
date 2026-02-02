/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { TrendingDown } from 'lucide-react';

type SellingItems = {
	name: string;
	totalRevenue: number;
	totalSales: number;
	totalRepresentation: number;
};

interface DataProps {
	data: SellingItems[];
}

export function LeastSellingDrinks({ data }: DataProps) {
	return (
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Bebidas Menos Vendidas
			</h2>
			<Table className='mt-3 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>
						<p className='flex w-full items-center text-nowrap gap-2'>
							Bebidas Menos Vendidas <TrendingDown size={16} />
						</p>
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
							className='text-xs max-w-48 truncate text-left capitalize'>
							{invoice.name}
						</TableCell>
						<TableCell>
							{invoice.totalRevenue.toLocaleString('pt-br', {
								style: 'currency',
								currency: 'brl',
							})}
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
