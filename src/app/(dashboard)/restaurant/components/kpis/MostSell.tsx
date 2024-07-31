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

const data = [
	{
		id: 1,
		items: 'Cafe Premium',
		sells: 205,
	},
	{
		id: 2,
		items: 'Lush Burger',
		sells: 145,
	},
	{
		id: 3,
		items: 'Risoto Com Escalope De File Mignon',
		sells: 127,
	},
	{
		id: 4,
		items: 'Salmao Limone',
		sells: 120,
	},
	{
		id: 5,
		items: 'Cafe Lush',
		sells: 113,
	},
	{
		id: 6,
		items: 'Mix Pasteis',
		sells: 112,
	},
	{
		id: 7,
		items: 'Pizza (3 Sabores)',
		sells: 99,
	},
	{
		id: 8,
		items: 'Ciabatta De Mignon Com Queijo',
		sells: 90,
	},
	{
		id: 9,
		items: 'Fritas Com Molho De Queijo',
		sells: 90,
	},
	{
		id: 10,
		items: 'Risoto De Camarão',
		sells: 87,
	},
];

export function MostSell() {
	return (
		<Table className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Itens Mais Vendidos</TableHead>
					<TableHead className='text-center'>Vendas</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{data.map((invoice) => (
					<TableRow
						key={invoice.id}
						className='text-center'>
						<TableCell className='font-bold text-left'>
							{invoice.items}
						</TableCell>
						<TableCell>{invoice.sells}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
