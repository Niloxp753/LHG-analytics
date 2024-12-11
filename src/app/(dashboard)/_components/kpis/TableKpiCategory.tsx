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

interface SuiteCategory {
	id: number;
	Categoria: string;
	locations: string;
	revenue: string;
	ticket: string;
	giro: number;
	revpar: string;
	trevpar: string;
	tmo: string;
	occupation: string;
}

interface TableKpiCategoryProps {
	dataTable?: SuiteCategory[];
	datatableResult?: any;
}

export default function TableKpiCategory({
	dataTable,
	datatableResult,
}: TableKpiCategoryProps) {
	const dataTableSuiteCategory = dataTable;

	const formattedData = dataTableSuiteCategory?.map((item, index) => {
		const [categoria, data] = Object.entries(item)[0]; // Extrai a categoria e os dados

		return {
			id: index + 1, // ID incremental
			Categoria: categoria,
			locations: data.totalRentalsApartments.toString(), // Convertido para string
			revenue: data.totalValue, // Mantém como string
			ticket: data.totalTicketAverage, // Mantém como string
			giro: parseFloat(data.giro), // Converte para número
			revpar: data.revpar, // Mantém como string
			trevpar: data.trevpar, // Mantém como string
			tmo: data.averageOccupationTime, // Mantém o formato de tempo
			occupation: data.occupancyRate, // Taxa de ocupação como string percentual
		};
	});

	const dataResult = datatableResult;

	const formattedTotalResult: SuiteCategory = {
		id: 1,
		Categoria: 'Total',
		locations: dataResult?.totalAllRentalsApartments.toString(),
		revenue: dataResult?.totalAllValue,
		ticket: dataResult?.totalAllTicketAverage,
		giro: parseFloat(dataResult?.totalGiro),
		revpar: dataResult?.totalRevpar,
		trevpar: dataResult?.totalTrevpar,
		tmo: dataResult?.totalAverageOccupationTime,
		occupation: dataResult?.totalOccupancyRate,
	};

	return (
		<Table className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead>Categoria</TableHead>
					<TableHead className='text-center'>Locações</TableHead>
					<TableHead className='text-center'>Receita Total</TableHead>
					<TableHead className='text-center'>Ticket Médio</TableHead>
					<TableHead className='text-center'>Giro</TableHead>
					<TableHead className='text-center'>Revpar</TableHead>
					<TableHead className='text-center'>TRevPar</TableHead>
					<TableHead className='text-center'>TMO</TableHead>
					<TableHead className='text-center'>TX de Ocupação</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{dataTableSuiteCategory &&
					formattedData?.map((invoice) => (
						<TableRow
							key={invoice.id}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.Categoria}
							</TableCell>
							<TableCell>{invoice.locations}</TableCell>
							<TableCell>{invoice.revenue}</TableCell>
							<TableCell>{invoice.ticket}</TableCell>
							<TableCell>{invoice.giro}</TableCell>
							<TableCell>{invoice.revpar}</TableCell>
							<TableCell>{invoice.trevpar}</TableCell>
							<TableCell>{invoice.tmo}</TableCell>
							<TableCell>{invoice.occupation}</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>
						{formattedTotalResult && formattedTotalResult.Categoria}
					</TableCell>
					<TableCell>{formattedTotalResult.locations}</TableCell>
					<TableCell>{formattedTotalResult.revenue}</TableCell>
					<TableCell>{formattedTotalResult.ticket}</TableCell>
					<TableCell>{formattedTotalResult.giro}</TableCell>
					<TableCell>{formattedTotalResult.revpar}</TableCell>
					<TableCell>{formattedTotalResult.trevpar}</TableCell>
					<TableCell>{formattedTotalResult.tmo}</TableCell>
					<TableCell>{formattedTotalResult.occupation}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
