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

interface SuiteCategoryMetrics {
	totalRentalsApartments: number;
	totalValue: number;
	totalTicketAverage: number;
	giro: number;
	revpar: number;
	trevpar: number;
	averageOccupationTime: string;
	occupancyRate: number;
}

type SuiteCategoryEntry = Record<string, SuiteCategoryMetrics>;

interface SuiteCategoryTotals {
	totalAllRentalsApartments: number;
	totalAllValue: number;
	totalAllTicketAverage: number;
	totalGiro: number;
	totalRevpar: number;
	totalTrevpar: number;
	totalAverageOccupationTime: string;
	totalOccupancyRate: number;
}

interface SuiteCategoryRow {
	id: number;
	Categoria: string;
	locations: number;
	revenue: number;
	ticket: number;
	giro: number;
	revpar: number;
	trevpar: number;
	tmo: string;
	occupation: number;
}

interface TableKpiCategoryProps {
	dataTable?: SuiteCategoryEntry[];
	datatableResult?: SuiteCategoryTotals;
}

export default function TableKpiCategory({
	dataTable,
	datatableResult,
}: TableKpiCategoryProps) {
	const dataTableSuiteCategory = dataTable;

	const formattedData: SuiteCategoryRow[] =
		dataTableSuiteCategory?.map((item, index) => {
			const [categoria, data] = Object.entries(item)[0] ?? [];
			if (!categoria || !data) {
				return {
					id: index + 1,
					Categoria: '',
					locations: 0,
					revenue: 0,
					ticket: 0,
					giro: 0,
					revpar: 0,
					trevpar: 0,
					tmo: '',
					occupation: 0,
				};
			}

			const metrics = data as SuiteCategoryMetrics;

			return {
				id: index + 1,
				Categoria: categoria,
				locations: metrics.totalRentalsApartments,
				revenue: metrics.totalValue,
				ticket: metrics.totalTicketAverage,
				giro: Number(metrics.giro.toFixed(2)),
				revpar: metrics.revpar,
				trevpar: metrics.trevpar,
				tmo: metrics.averageOccupationTime,
				occupation: metrics.occupancyRate,
			};
		}) ?? [];

	const dataResult = datatableResult;

	const formattedTotalResult: SuiteCategoryRow = dataResult
		? {
			id: 1,
			Categoria: 'Total',
			locations: dataResult.totalAllRentalsApartments,
			revenue: dataResult.totalAllValue,
			ticket: dataResult.totalAllTicketAverage,
			giro: Number(dataResult.totalGiro.toFixed(2)),
			revpar: dataResult.totalRevpar,
			trevpar: dataResult.totalTrevpar,
			tmo: dataResult.totalAverageOccupationTime,
			occupation: dataResult.totalOccupancyRate,
		}
		: {
			id: 1,
			Categoria: 'Total',
			locations: 0,
			revenue: 0,
			ticket: 0,
			giro: 0,
			revpar: 0,
			trevpar: 0,
			tmo: '',
			occupation: 0,
		};

	return (
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Resumo por Categoria
			</h2>
			<Table className='mt-3 bg-zinc-900 rounded-lg'>
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
					formattedData.map((invoice) => (
						<TableRow
							key={invoice.id}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.Categoria}
							</TableCell>
							<TableCell>{invoice.locations}</TableCell>
							<TableCell>
								{invoice.revenue.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'brl',
								})}
							</TableCell>
							<TableCell>
								{invoice.ticket.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'brl',
								})}
							</TableCell>
							<TableCell>{invoice.giro}</TableCell>
							<TableCell>
								{invoice.revpar.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'brl',
								})}
							</TableCell>
							<TableCell>
								{invoice.trevpar.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'brl',
								})}
							</TableCell>
							<TableCell>{invoice.tmo}</TableCell>
							<TableCell>{invoice.occupation.toFixed(2)}%</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
				<TableRow className='text-center hover:bg-zinc-700'>
					<TableCell className=' w-1/5 text-left'>
						{formattedTotalResult.Categoria}
					</TableCell>
					<TableCell>{formattedTotalResult.locations}</TableCell>
					<TableCell>
						{formattedTotalResult.revenue.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'brl',
						})}
					</TableCell>
					<TableCell>
						{formattedTotalResult.ticket.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'brl',
						})}
					</TableCell>
					<TableCell>{formattedTotalResult.giro}</TableCell>
					<TableCell>
						{formattedTotalResult.revpar.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'brl',
						})}
					</TableCell>
					<TableCell>
						{formattedTotalResult.trevpar.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'brl',
						})}
					</TableCell>
					<TableCell>{formattedTotalResult.tmo}</TableCell>
					<TableCell>{formattedTotalResult.occupation.toFixed(2)}%</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
		</div>
	);
}
