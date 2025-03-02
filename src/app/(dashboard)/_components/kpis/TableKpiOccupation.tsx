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

interface OccupancyData {
	occupancyRate: string;
	totalOccupancyRate: string;
}

interface CategoryOccupancyData {
	[day: string]: OccupancyData;
}

interface OccupancyTableEntry {
	[category: string]: CategoryOccupancyData;
}

interface OccupancyOutput {
	category: string;
	[key: string]: string | undefined;
}

export function TableKpiOccupation(dataOccupation?: any) {
	const dataTableOccupancyRateByWeek: OccupancyTableEntry[] =
		dataOccupation.data;

	const week: { [key: string]: string } = {
		sábado: 'sabado',
		'sexta-feira': 'sexta',
		'quinta-feira': 'quinta',
		'quarta-feira': 'quarta',
		'terça-feira': 'terca',
		'segunda-feira': 'segunda',
		domingo: 'domingo',
	};

	const occupancyData: OccupancyOutput[] = [];
	const totalOccupancy: { [key: string]: string } = {};

	dataTableOccupancyRateByWeek?.forEach((item, index) => {
		const category = Object.keys(item)[0];
		const weekData = item[category.toUpperCase()] as CategoryOccupancyData;

		const newEntry: OccupancyOutput = { category };

		for (const [day, values] of Object.entries(weekData)) {
			const formattedDay = week[day];
			if (formattedDay) {
				newEntry[formattedDay] = values.occupancyRate;

				// Preencher total apenas na primeira iteração com totalOccupancyRate
				if (index === 0) {
					totalOccupancy[formattedDay] = values.totalOccupancyRate;
				}
			}
		}

		occupancyData.push(newEntry);
	});

	// Exibindo o resultado final

	return (
		<Table
			title='TX de ocupação por Dia da Semana'
			className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg text-sm'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Categorias</TableHead>
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
				{dataTableOccupancyRateByWeek &&
					occupancyData.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.category}
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
					<TableCell className=' w-1/5 text-left'>
						Total Tx de Ocupação
					</TableCell>
					<TableCell>{totalOccupancy.domingo}</TableCell>
					<TableCell>{totalOccupancy.segunda}</TableCell>
					<TableCell>{totalOccupancy.terca}</TableCell>
					<TableCell>{totalOccupancy.quarta}</TableCell>
					<TableCell>{totalOccupancy.quinta}</TableCell>
					<TableCell>{totalOccupancy.sexta}</TableCell>
					<TableCell>{totalOccupancy.sabado}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
