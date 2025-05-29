/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	SellingItems,
	transformBestSellingItems,
} from '@/utils/transform-table-items';

interface DataProps {
	data: SellingItems;
}

export function MostSell({ data }: DataProps) {
	const allData = transformBestSellingItems(data);
	return (
		<Table className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Itens Mais Vendidos</TableHead>
					<TableHead className='text-center'>Vendas</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{allData.map((invoice) => (
					<TableRow
						key={invoice.id}
						className='text-center'>
						<TableCell className='font-bold text-left capitalize'>
							{invoice.items}
						</TableCell>
						<TableCell>{invoice.sells}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
