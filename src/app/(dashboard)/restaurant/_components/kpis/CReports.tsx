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

interface ReportEntry {
	name: string;
	revenue: number;
	revenuePercent: number | string;
	quantity: number | string;
	quantityPercent: number | string;
}

interface CReportsProps {
	data: ReportEntry[];
	currencyConfig?: CurrencyConfig;
}

export function CReports({ data, currencyConfig }: CReportsProps) {
	return (
		<div className='mt-5 w-full'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Relatório de Produtos Adicionais
			</h2>
			<Table className='mt-3 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Relatório de Produtos Adicionais</TableHead>
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
								{formatCurrency(invoice.revenue, currencyConfig)}
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
