/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/_components/ui/table';

const data = [
	{
		id: 1,
		items: 'SOFT DRINKS',
		revenue: 59306,
		revenuePercent: '35,16%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
	{
		id: 2,
		items: 'CERVEJAS',
		revenue: 22125,
		revenuePercent: '13,12%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
	{
		id: 3,
		items: 'COQUETEIS',
		revenue: 11313,
		revenuePercent: '6,71%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
	{
		id: 4,
		items: 'DOSES',
		revenue: 13852,
		revenuePercent: '8,21%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
	{
		id: 5,
		items: 'GARRAFAS',
		revenue: 17286,
		revenuePercent: '10,25%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
	{
		id: 6,
		items: 'VINHOS E ESPUMANTES',
		revenue: 42638,
		revenuePercent: '25,28%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
	{
		id: 7,
		items: 'COMBOS',
		revenue: 2150,
		revenuePercent: '1,27%',
		quantity: 6048,
		quantityPercent: '73,63%',
	},
];

export function BReports() {
	return (
		<Table className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Relatório de Bebidas</TableHead>
					<TableHead className='text-center'>Receita</TableHead>{' '}
					<TableHead className='text-center'>% Receita</TableHead>
					<TableHead className='text-center'>QNTD</TableHead>{' '}
					<TableHead className='text-center'>% QNTD</TableHead>{' '}
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{data.map((invoice) => (
					<TableRow
						key={invoice.id}
						className='text-center'>
						<TableCell className='font-bold text-left capitalize'>
							{invoice.items}
						</TableCell>
						<TableCell>{invoice.revenue}</TableCell>{' '}
						<TableCell>{invoice.revenuePercent}</TableCell>{' '}
						<TableCell>{invoice.quantity}</TableCell>{' '}
						<TableCell>{invoice.quantityPercent}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter className='w-full text-white bg-zinc-700 text-center font-bold'>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell>R$ 168.670,00</TableCell>
					<TableCell>40,36%</TableCell>
					<TableCell className=''>8412</TableCell>{' '}
					<TableCell className=''>100%</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
