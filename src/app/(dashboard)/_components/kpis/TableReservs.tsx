/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/_components/ui/table';

const data = [
	{
		id: 1,
		category: 'Units',
		total: 397,
		siteLushImediata: 88,
		siteLushProgramada: 192,
		guiaGo: 101,
		guiaProgramada: 6,
		direta: 7,
		booking: 2,
		expedia: 0,
		giftCard: 1,
	},
	{
		id: 2,
		category: 'Receita Total',
		total: 341518,
		siteLushImediata: 64381,
		siteLushProgramada: 202724,
		guiaGo: 48953,
		guiaProgramada: 5139,
		direta: 18323,
		booking: 1598,
		expedia: 0,
		giftCard: 400,
	},
	{
		id: 3,
		category: 'Ticket Médio',
		total: 860,
		siteLushImediata: 732,
		siteLushProgramada: 1056,
		guiaGo: 485,
		guiaProgramada: 857,
		direta: 2618,
		booking: 799,
		expedia: 0,
		giftCard: 400,
	},
	{
		id: 4,
		category: 'Representatividade',
		total: '',
		siteLushImediata: '19%',
		siteLushProgramada: '59%',
		guiaGo: '14%',
		guiaProgramada: '2%',
		direta: '5%',
		booking: '0%',
		expedia: '0%',
		giftCard: '0%',
	},
];

export function TableReservs() {
	return (
		<Table
			title='Giro por Dia da Semana'
			className='mt-5 bg-zinc-900 rounded-lg'>
			<TableHeader className='bg-violet-900 rounded-lg text-sm'>
				<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
					<TableHead className='text-left text-xs '>KPIS</TableHead>
					<TableHead className='text-center text-xs '>
						Total de reservas
					</TableHead>
					<TableHead className='text-center text-xs '>
						Site lush imediata
					</TableHead>
					<TableHead className='text-center text-xs'>
						Site lush programada
					</TableHead>
					<TableHead className='text-center text-xs '>Guia Go</TableHead>
					<TableHead className='text-center text-xs '>
						Guia Programada
					</TableHead>
					<TableHead className='text-center text-xs'>Direta</TableHead>
					<TableHead className='text-center text-xs '>Booking</TableHead>
					<TableHead className='text-center text-xs '>Expedia</TableHead>
					<TableHead className='text-center text-xs '>Gift Card</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				{data.map((invoice) => (
					<TableRow
						key={invoice.id}
						className='text-center'>
						<TableCell className='font-bold text-left'>
							{invoice.category}
						</TableCell>
						<TableCell>{invoice.total}</TableCell>
						<TableCell>{invoice.siteLushImediata}</TableCell>
						<TableCell>{invoice.siteLushProgramada}</TableCell>
						<TableCell>{invoice.guiaGo}</TableCell>
						<TableCell>{invoice.guiaProgramada}</TableCell>
						<TableCell>{invoice.direta}</TableCell>
						<TableCell>{invoice.booking}</TableCell>
						<TableCell>{invoice.expedia}</TableCell>
						<TableCell>{invoice.giftCard}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
