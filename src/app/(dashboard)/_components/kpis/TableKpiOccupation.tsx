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

interface TableKpiOccupationProps {
	data?: OccupancyTableEntry[];
}

export function TableKpiOccupation({ data }: TableKpiOccupationProps) {
	const dataTableOccupancyRateByWeek: OccupancyTableEntry[] | undefined = data;

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
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Taxa de Ocupação por Dia da Semana
			</h2>
			<Table
				title='TX de ocupação por Dia da Semana'
				className='mt-3 bg-zinc-900 rounded-lg'>
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
							<TableCell>{Number(invoice.domingo)?.toFixed(2) ?? 0}%</TableCell>
							<TableCell>{Number(invoice.segunda)?.toFixed(2) ?? 0}%</TableCell>
							<TableCell>{Number(invoice.terca)?.toFixed(2) ?? 0}%</TableCell>
							<TableCell>{Number(invoice.quarta)?.toFixed(2) ?? 0}%</TableCell>
							<TableCell>{Number(invoice.quinta)?.toFixed(2) ?? 0}%</TableCell>
							<TableCell>{Number(invoice.sexta)?.toFixed(2) ?? 0}%</TableCell>
							<TableCell>{Number(invoice.sabado)?.toFixed(2) ?? 0}%</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>
						Total Tx de Ocupação
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.domingo)?.toFixed(2) ?? 0}%
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.segunda)?.toFixed(2) ?? 0}%
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.terca)?.toFixed(2) ?? 0}%
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.quarta)?.toFixed(2) ?? 0}%
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.quinta)?.toFixed(2) ?? 0}%
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.sexta)?.toFixed(2) ?? 0}%
					</TableCell>
					<TableCell>
						{Number(totalOccupancy.sabado)?.toFixed(2) ?? 0}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
		</div>
	);
}
