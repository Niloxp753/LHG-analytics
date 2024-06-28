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
		Categoria: 'Lush Pop',
		domingo: 1.18,
		segunda: 0.92,
		terca: 1.06,
		quarta: 0.85,
		quinta: 0.6,
		sexta: 1.15,
		sabado: 1.8,
	},
	{
		id: 2,
		Categoria: 'Lush',
		domingo: 1.53,
		segunda: 1.18,
		terca: 1.33,
		quarta: 1.38,
		quinta: 1.53,
		sexta: 2.44,
		sabado: 3.0,
	},
	{
		id: 3,
		Categoria: 'Lush Hidro',
		domingo: 1.92,
		segunda: 1.33,
		terca: 1.23,
		quarta: 1.54,
		quinta: 1.88,
		sexta: 2.67,
		sabado: 2.25,
	},
	{
		id: 4,
		Categoria: 'Lush Lounge',
		domingo: 1.06,
		segunda: 1.15,
		terca: 1.6,
		quarta: 1.44,
		quinta: 1.56,
		sexta: 2.5,
		sabado: 3.31,
	},
	{
		id: 5,
		Categoria: 'Lush Spa',
		domingo: 1.61,
		segunda: 1.04,
		terca: 1.33,
		quarta: 1.71,
		quinta: 1.93,
		sexta: 1.89,
		sabado: 2.2,
	},
	{
		id: 6,
		Categoria: 'Lush Cine',
		domingo: 1.88,
		segunda: 1.4,
		terca: 1.3,
		quarta: 1.25,
		quinta: 1.5,
		sexta: 2.5,
		sabado: 2.88,
	},
	{
		id: 7,
		Categoria: 'Lush Splash',
		domingo: 1.58,
		segunda: 0.89,
		terca: 1.42,
		quarta: 1.42,
		quinta: 1.47,
		sexta: 1.64,
		sabado: 2.0,
	},
	{
		id: 8,
		Categoria: 'Lush Spa Splash',
		domingo: 1.54,
		segunda: 1.31,
		terca: 1.54,
		quarta: 1.82,
		quinta: 1.68,
		sexta: 1.64,
		sabado: 1.71,
	},
	{
		id: 9,
		Categoria: 'Casa Lush',
		domingo: 1.0,
		segunda: 1.09,
		terca: 1.32,
		quarta: 1.44,
		quinta: 1.52,
		sexta: 1.91,
		sabado: 2.23,
	},
];

export function TableKpiOccupation() {
	return (
		<Table
			title='TX de ocupação por Dia da Semana'
			className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg text-sm'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>junho/24</TableHead>
					<TableHead className='text-center text-xs '>Domingo</TableHead>
					<TableHead className='text-center text-xs '>Segunda-Feira</TableHead>
					<TableHead className='text-center text-xs'>Terça-Feira</TableHead>
					<TableHead className='text-center text-xs '>Quarta-Feira</TableHead>
					<TableHead className='text-center text-xs '>Quinta-Feira</TableHead>
					<TableHead className='text-center text-xs'>Sexta-Feira</TableHead>
					<TableHead className='text-center text-xs '>Sábado</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{data.map((invoice) => (
					<TableRow
						key={invoice.id}
						className='text-center'>
						<TableCell className='font-bold text-left'>
							{invoice.Categoria}
						</TableCell>
						<TableCell>{invoice.domingo}</TableCell>
						<TableCell>{invoice.segunda}</TableCell>
						<TableCell>{invoice.terca}</TableCell>
						<TableCell>{invoice.quarta}</TableCell>
						<TableCell>{invoice.quinta}</TableCell>
						<TableCell>{invoice.sexta}</TableCell>
						<TableCell>{invoice.sabado}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>Total Occupation</TableCell>
					<TableCell>1.15</TableCell>
					<TableCell>1.09</TableCell>
					<TableCell>1.32</TableCell>
					<TableCell>1.44</TableCell>
					<TableCell>1.52</TableCell>
					<TableCell>1.91</TableCell>
					<TableCell>2.23</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
