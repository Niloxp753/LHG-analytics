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

interface DataItem {
	giro: string;
	totalGiro: string;
}

interface CategoryData {
	[day: string]: DataItem;
}

interface DataTableEntry {
	[category: string]: CategoryData;
}

interface DataOutput {
	categoria: string;
	[key: string]: string | number | undefined; // Permite qualquer chave de string com valor `number` ou `undefined`
}

interface TableKpiGiroProps {
	data?: DataTableEntry[];
}

export function TableKpiGiro({ data }: TableKpiGiroProps) {
	const dataTableGiroByWeek: DataTableEntry[] | undefined = data;

	const week: { [key: string]: string } = {
		sábado: 'sabado',
		'sexta-feira': 'sexta',
		'quinta-feira': 'quinta',
		'quarta-feira': 'quarta',
		'terça-feira': 'terca',
		'segunda-feira': 'segunda',
		domingo: 'domingo',
	};

	const rows: DataOutput[] = [];
	const total: { [key: string]: number } = {};

	dataTableGiroByWeek?.forEach((item, index) => {
		const category = Object.keys(item)[0];
		const weekData = item[category.toUpperCase()] as CategoryData;

		const newEntry: DataOutput = { categoria: category };

		for (const [day, values] of Object.entries(weekData)) {
			const newDay = week[day];
			if (newDay) {
				newEntry[newDay] = parseFloat(values.giro);

				// Popula `total` apenas na primeira iteração com os valores de `totalGiro`
				if (index === 0) {
					total[newDay] = parseFloat(values.totalGiro);
				}
			}
		}

		rows.push(newEntry);
	});

	return (
		<Table
			title='Giro por Dia da Semana'
			className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg text-sm'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Categorias</TableHead>
					<TableHead className='text-center text-xs'>Domingo</TableHead>
					<TableHead className='text-center text-xs'>Segunda-Feira</TableHead>
					<TableHead className='text-center text-xs'>Terça-Feira</TableHead>
					<TableHead className='text-center text-xs '>Quarta-Feira</TableHead>
					<TableHead className='text-center text-xs '>Quinta-Feira</TableHead>
					<TableHead className='text-center text-xs'>Sexta-Feira</TableHead>
					<TableHead className='text-center text-xs '>Sábado</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{dataTableGiroByWeek &&
					rows.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.categoria}
							</TableCell>
							<TableCell>{Number(invoice.domingo)?.toFixed(2)}</TableCell>
							<TableCell>{Number(invoice.segunda)?.toFixed(2)}</TableCell>
							<TableCell>{Number(invoice.terca)?.toFixed(2)}</TableCell>
							<TableCell>{Number(invoice.quarta)?.toFixed(2)}</TableCell>
							<TableCell>{Number(invoice.quinta)?.toFixed(2)}</TableCell>
							<TableCell>{Number(invoice.sexta)?.toFixed(2)}</TableCell>
							<TableCell>{Number(invoice.sabado)?.toFixed(2)}</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>Total Giro</TableCell>
					<TableCell>{Number(total.domingo)?.toFixed(2)}</TableCell>
					<TableCell>{Number(total.segunda)?.toFixed(2)}</TableCell>
					<TableCell>{Number(total.terca)?.toFixed(2)}</TableCell>
					<TableCell>{Number(total.quarta)?.toFixed(2)}</TableCell>
					<TableCell>{Number(total.quinta)?.toFixed(2)}</TableCell>
					<TableCell>{Number(total.sexta)?.toFixed(2)}</TableCell>
					<TableCell>{Number(total.sabado)?.toFixed(2)}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
