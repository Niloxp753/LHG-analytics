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
		items: 'Moqueca Vegana',
		sells: 6,
	},
	{
		id: 2,
		items: 'Vegan Burger',
		sells: 7,
	},
	{
		id: 3,
		items: 'Lush Shake',
		sells: 22,
	},
	{
		id: 4,
		items: 'New York Cheesecake',
		sells: 25,
	},
	{
		id: 5,
		items: 'File De Frango (Cortes Especiais)',
		sells: 29,
	},
	{
		id: 6,
		items: 'Pappardelle Com Ragu De Costela',
		sells: 30,
	},
	{
		id: 7,
		items: 'Moqueca De Camarão',
		sells: 34,
	},
	{
		id: 8,
		items: 'Salada Lush',
		sells: 38,
	},
	{
		id: 9,
		items: 'Picadinho Lush',
		sells: 38,
	},
	{
		id: 10,
		items: 'Cafe Brunch',
		sells: 40,
	},
];

export function MinusSell() {
	return (
		<Table className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Itens Menos Vendidos</TableHead>
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
