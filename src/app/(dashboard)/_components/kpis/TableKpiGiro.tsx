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

export function TableKpiGiro(dataGiro?: any) {
	const dataTableGiroByWeek: DataTableEntry[] = dataGiro.data;

	const week: { [key: string]: string } = {
		sábado: 'sabado',
		'sexta-feira': 'sexta',
		'quinta-feira': 'quinta',
		'quarta-feira': 'quarta',
		'terça-feira': 'terca',
		'segunda-feira': 'segunda',
		domingo: 'domingo',
	};

	const data: DataOutput[] = [];
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

		data.push(newEntry);
	});

	// Exibindo o resultado final

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
					data.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.categoria}
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
					<TableCell className=' w-1/5 text-left'>Total Giro</TableCell>
					<TableCell>{total.domingo}</TableCell>
					<TableCell>{total.segunda}</TableCell>
					<TableCell>{total.terca}</TableCell>
					<TableCell>{total.quarta}</TableCell>
					<TableCell>{total.quinta}</TableCell>
					<TableCell>{total.sexta}</TableCell>
					<TableCell>{total.sabado}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
