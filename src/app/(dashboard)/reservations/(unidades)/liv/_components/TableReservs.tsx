/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, type CurrencyConfig } from "@/lib/currency-format";

interface BookingsTotalByChannel {
  TOTALALLBOOKINGS: number;
  WEBSITE_IMMEDIATE: number;
  WEBSITE_SCHEDULED: number;
  GUIA_GO: number;
  GUIA_SCHEDULED: number;
  INTERNAL: number;
}

interface BookingsValueByChannel {
  TOTALALLVALUE: number;
  WEBSITE_IMMEDIATE: number;
  WEBSITE_SCHEDULED: number;
  GUIA_GO: number;
  GUIA_SCHEDULED: number;
  INTERNAL: number;
}

interface BookingsTicketAverageByChannel {
  TOTALALLTICKETAVERAGE: number;
  WEBSITE_IMMEDIATE: number;
  WEBSITE_SCHEDULED: number;
  GUIA_GO: number;
  GUIA_SCHEDULED: number;
  INTERNAL: number;
}

interface BookingsRepresentativenessByChannel {
  TOTALALLREPRESENTATIVENESS: number;
  WEBSITE_IMMEDIATE: number;
  WEBSITE_SCHEDULED: number;
  GUIA_GO: number;
  GUIA_SCHEDULED: number;
  INTERNAL: number;
}

interface TableProps {
  bookingsTotalRentalsByChannelType: BookingsTotalByChannel;
  bookingsRevenueByChannelType: BookingsValueByChannel;
  bookingsTicketAverageByChannelType: BookingsTicketAverageByChannel;
  bookingsRepresentativenessByChannelType: BookingsRepresentativenessByChannel;
}

interface TableReservsProps {
  data?: TableProps | null;
  currencyConfig?: CurrencyConfig;
}

function formatPercent(value: unknown): string {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) {
    return "0.00%";
  }
  return `${numeric.toFixed(2)}%`;
}

export function TableReservs({ data, currencyConfig }: TableReservsProps) {
  if (typeof data === "undefined") {
    return (
      <div className="mt-5 bg-zinc-900 rounded-lg p-4">
        <Skeleton className="h-[240px] w-full" />
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="mt-5 bg-zinc-900 rounded-lg p-4">
        <Alert variant="destructive" className="w-full">
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
    <div className="mt-5">
      <h2 className="text-zinc-50 text-lg font-semibold">Reservas por Canal</h2>
      <Table
        title="Giro por Dia da Semana"
        className="mt-3 bg-zinc-900 rounded-lg"
      >
        <TableHeader className="bg-violet-900 rounded-lg text-sm">
          <TableRow className="hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center">
            <TableHead className="text-left text-xs ">KPIS</TableHead>
            <TableHead className="text-center text-xs ">
              Total de reservas
            </TableHead>
            <TableHead className="text-center text-xs ">
              Site lush imediata
            </TableHead>
            <TableHead className="text-center text-xs">
              Site lush programada
            </TableHead>
            <TableHead className="text-center text-xs ">Guia Go</TableHead>
            <TableHead className="text-center text-xs ">
              Guia Programada
            </TableHead>
            <TableHead className="text-center text-xs">Direta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-zinc-100">
          <TableRow className="text-center">
            <TableCell className="font-bold text-left">
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
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-bold text-left">Receita Total</TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsRevenueByChannelType.TOTALALLVALUE,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsRevenueByChannelType.WEBSITE_IMMEDIATE,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsRevenueByChannelType.WEBSITE_SCHEDULED,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsRevenueByChannelType.GUIA_GO,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsRevenueByChannelType.GUIA_SCHEDULED,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsRevenueByChannelType.INTERNAL,
                currencyConfig,
              )}
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-bold text-left">Ticket Médio</TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsTicketAverageByChannelType
                  .TOTALALLTICKETAVERAGE,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsTicketAverageByChannelType.WEBSITE_IMMEDIATE,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsTicketAverageByChannelType.WEBSITE_SCHEDULED,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsTicketAverageByChannelType.GUIA_GO,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsTicketAverageByChannelType.GUIA_SCHEDULED,
                currencyConfig,
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                dataTable.bookingsTicketAverageByChannelType.INTERNAL,
                currencyConfig,
              )}
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-bold text-left">
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
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
