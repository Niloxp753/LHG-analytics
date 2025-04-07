/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Currency } from 'lucide-react';

const datat = [
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

interface TableProps {
	EXPEDIA: number;
	WEBSITE_SCHEDULED: number;
	WEBSITE_IMMEDIATE: number;
	INTERNAL: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	BOOKING: number;
	TOTAL: number;
}

interface TableReservsProps {
	data: TableProps;
}

export function TableReservs({ data }: TableReservsProps) {
	const dataTable: any = data;

	return !dataTable ? (
		<Skeleton className='w-full h-40'></Skeleton>
	) : (
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
				</TableRow>
			</TableHeader>
			<TableBody className='text-zinc-100'>
				<TableRow className='text-center'>
					<TableCell className='font-bold text-left'>
						Unidades Reservadas
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.TOTALALLBOOKINGS}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.WEBSITE_IMMEDIATE}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.WEBSITE_SCHEDULED}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.GUIA_GO}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.GUIA_SCHEDULED}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.INTERNAL}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.BOOKING}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTotalRentalsByChannelType.EXPEDIA}
					</TableCell>
				</TableRow>
				<TableRow className='text-center'>
					<TableCell className='font-bold text-left'>Receita Total</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.TOTALALLVALUE.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.WEBSITE_IMMEDIATE.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.WEBSITE_SCHEDULED.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.GUIA_GO.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.GUIA_SCHEDULED.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.INTERNAL.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.BOOKING.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.EXPEDIA.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
				</TableRow>
				<TableRow className='text-center'>
					<TableCell className='font-bold text-left'>Ticket Médio</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.TOTALALLTICKETAVERAGE.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.WEBSITE_IMMEDIATE.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.WEBSITE_SCHEDULED.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.GUIA_GO.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.GUIA_SCHEDULED.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.INTERNAL.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.BOOKING.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.EXPEDIA.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
				</TableRow>
				<TableRow className='text-center'>
					<TableCell className='font-bold text-left'>
						Representatividade
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType
							.TOTALALLREPRESENTATIVENESS *
							100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType
							.WEBSITE_IMMEDIATE *
							100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType
							.WEBSITE_SCHEDULED *
							100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType.GUIA_GO * 100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType.GUIA_SCHEDULED *
							100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType.INTERNAL * 100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType.BOOKING * 100 +
							'%'}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRepresentativenessByChannelType.EXPEDIA * 100 +
							'%'}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
