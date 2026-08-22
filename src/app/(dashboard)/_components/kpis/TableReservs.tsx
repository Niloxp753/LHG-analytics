/** @format */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type CurrencyConfig } from "@/lib/currency-format";
import {
  buildReservationsTableViewModel,
  type ReservationsTableData,
} from "./reservations-table-view-model";

type TableReservsProps = {
  currencyConfig?: CurrencyConfig;
  data?: ReservationsTableData | null;
};

export function TableReservs({ currencyConfig, data }: TableReservsProps) {
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

  const viewModel = buildReservationsTableViewModel(data, currencyConfig);

  return (
    <div className="mt-5">
      <h2 className="text-zinc-50 text-lg font-semibold">
        Reservas por Canal
      </h2>
      <Table
        title="Giro por Dia da Semana"
        className="mt-3 bg-zinc-900 rounded-lg"
      >
        <TableHeader className="bg-violet-900 rounded-lg text-sm">
          <TableRow className="hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center">
            <TableHead className="text-left text-xs">KPIS</TableHead>
            {viewModel.columns.map(({ key, label }) => (
              <TableHead key={key} className="text-center text-xs">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-zinc-100">
          {viewModel.rows.map(({ label, values }) => (
            <TableRow key={label} className="text-center">
              <TableCell className="font-bold text-left">{label}</TableCell>
              {values.map((value, index) => (
                <TableCell key={viewModel.columns[index].key}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
