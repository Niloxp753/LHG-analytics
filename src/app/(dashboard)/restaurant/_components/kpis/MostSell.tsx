/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type SellingItems = {
	name: string;
	totalRevenue: number;
	totalSales: number;
	totalRepresentation: number;
};

interface DataProps {
	data: SellingItems[];
}

export function MostSell({ data }: DataProps) {
	return (
		<Table className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Itens Mais Vendidos</TableHead>
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
						<TableCell className='font-bold text-left capitalize'>
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
	);
}
