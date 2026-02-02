/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface ReportEntry {
	name: string;
	revenue: number;
	revenuePercent: number | string;
	quantity: number | string;
	quantityPercent: number | string;
}

export function AReports({ data }: { data: ReportEntry[] }) {
	return (
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Relatório de Alimentos
			</h2>
			<Table className='mt-3 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Relatório de Alimentos</TableHead>
					<TableHead className='text-center'>Receita</TableHead>
					<TableHead className='text-center'>% Receita</TableHead>
					<TableHead className='text-center'>QNTD</TableHead>
					<TableHead className='text-center'>% QNTD</TableHead>
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
							{invoice.revenue.toLocaleString('pt-br', {
								style: 'currency',
								currency: 'brl',
							})}
						</TableCell>
						<TableCell>{invoice.revenuePercent}</TableCell>
						<TableCell>{invoice.quantity}</TableCell>
						<TableCell>{invoice.quantityPercent}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</div>
	);
}
