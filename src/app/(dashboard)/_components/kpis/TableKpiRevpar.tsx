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

interface RevparData {
	revpar: number;
	totalRevpar: number;
}

interface CategoryRevparData {
	[day: string]: RevparData;
}

interface RevparTableEntry {
	[category: string]: CategoryRevparData;
}

interface RevparOutput {
	category: string;
	[key: string]: string | number | undefined;
}

export function TableKpiRevpar(dataRevpar?: any) {
	const dataTableRevparByWeek: RevparTableEntry[] = dataRevpar.data;

	const week: { [key: string]: string } = {
		sábado: 'sabado',
		'sexta-feira': 'sexta',
		'quinta-feira': 'quinta',
		'quarta-feira': 'quarta',
		'terça-feira': 'terca',
		'segunda-feira': 'segunda',
		domingo: 'domingo',
	};

	const revparData: RevparOutput[] = [];
	const totalRevpar: { [key: string]: number } = {};

	dataTableRevparByWeek?.forEach((item, index) => {
		const category = Object.keys(item)[0];
		const weekData = item[category.toUpperCase()] as CategoryRevparData;

		const newEntry: RevparOutput = { category };

		for (const [day, values] of Object.entries(weekData)) {
			const formattedDay = week[day];
			if (formattedDay) {
				newEntry[formattedDay] = Number(values.revpar);

				if (index === 0) {
					totalRevpar[formattedDay] = Number(values.totalRevpar);
				}
			}
		}

		revparData.push(newEntry);
	});

	return (
		<Table
			title='Revpar por Dia da Semana'
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
				{dataTableRevparByWeek &&
					revparData.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.category}
							</TableCell>
							<TableCell>
								{Number(invoice.domingo)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
							<TableCell>
								{Number(invoice.segunda)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
							<TableCell>
								{Number(invoice.terca)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
							<TableCell>
								{Number(invoice.quarta)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
							<TableCell>
								{Number(invoice.quinta)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
							<TableCell>
								{Number(invoice.sexta)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
							<TableCell>
								{Number(invoice.sabado)?.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>Total Revpar</TableCell>
					<TableCell>
						{Number(totalRevpar.domingo)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
					<TableCell>
						{Number(totalRevpar.segunda)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
					<TableCell>
						{Number(totalRevpar.terca)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
					<TableCell>
						{Number(totalRevpar.quarta)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
					<TableCell>
						{Number(totalRevpar.quinta)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
					<TableCell>
						{Number(totalRevpar.sexta)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
					<TableCell>
						{Number(totalRevpar.sabado)?.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
