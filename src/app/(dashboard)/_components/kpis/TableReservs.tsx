/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface BookingsTotalByChannel {
	TOTALALLBOOKINGS: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
}

interface BookingsValueByChannel {
	TOTALALLVALUE: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
}

interface BookingsTicketAverageByChannel {
	TOTALALLTICKETAVERAGE: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
}

interface BookingsRepresentativenessByChannel {
	TOTALALLREPRESENTATIVENESS: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
}

interface TableProps {
	bookingsTotalRentalsByChannelType: BookingsTotalByChannel;
	bookingsRevenueByChannelType: BookingsValueByChannel;
	bookingsTicketAverageByChannelType: BookingsTicketAverageByChannel;
	bookingsRepresentativenessByChannelType: BookingsRepresentativenessByChannel;
}

interface TableReservsProps {
	data?: TableProps | null;
}

function formatPercent(value: unknown): string {
	const numeric = typeof value === 'number' ? value : Number(value);
	if (!Number.isFinite(numeric)) {
		return '0.00%';
	}
	return `${numeric.toFixed(2)}%`;
}

export function TableReservs({ data }: TableReservsProps) {
	if (typeof data === 'undefined') {
		return (
			<div className='mt-5 bg-zinc-900 rounded-lg p-4'>
				<Skeleton className='h-[240px] w-full' />
			</div>
		);
	}

	if (data === null) {
		return (
			<div className='mt-5 bg-zinc-900 rounded-lg p-4'>
				<Alert
					variant='destructive'
					className='w-full'>
					<AlertTitle>Erro ao carregar</AlertTitle>
					<AlertDescription>
						Não foi possível carregar os dados.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	const dataTable = data;

	return (
		<div className='mt-5'>
			<h2 className='text-zinc-50 text-lg font-semibold'>
				Reservas por Canal
			</h2>
			<Table
				title='Giro por Dia da Semana'
				className='mt-3 bg-zinc-900 rounded-lg'>
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
						{dataTable.bookingsRevenueByChannelType.TOTALALLVALUE?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.WEBSITE_IMMEDIATE?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.WEBSITE_SCHEDULED?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.GUIA_GO?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.GUIA_SCHEDULED?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.INTERNAL?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.BOOKING?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsRevenueByChannelType.EXPEDIA?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
				</TableRow>
				<TableRow className='text-center'>
					<TableCell className='font-bold text-left'>Ticket Médio</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.TOTALALLTICKETAVERAGE?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.WEBSITE_IMMEDIATE?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.WEBSITE_SCHEDULED?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.GUIA_GO?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.GUIA_SCHEDULED?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.INTERNAL?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.BOOKING?.toLocaleString(
							'pt-BR',
							{ style: 'currency', currency: 'BRL' },
						)}
					</TableCell>
					<TableCell>
						{dataTable.bookingsTicketAverageByChannelType.EXPEDIA?.toLocaleString(
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
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType
								?.TOTALALLREPRESENTATIVENESS,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType
								?.WEBSITE_IMMEDIATE,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType
								?.WEBSITE_SCHEDULED,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType?.GUIA_GO,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType
								?.GUIA_SCHEDULED,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType?.INTERNAL,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType?.BOOKING,
						)}
					</TableCell>
					<TableCell>
						{formatPercent(
							dataTable.bookingsRepresentativenessByChannelType?.EXPEDIA,
						)}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
		</div>
	);
}
