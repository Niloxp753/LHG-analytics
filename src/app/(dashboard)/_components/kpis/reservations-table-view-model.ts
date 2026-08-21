/** @format */

import {
  formatCurrency,
  type CurrencyConfig,
} from "@/lib/currency-format";

type OptionalBookingChannels = {
  BOOKING?: number;
  EXPEDIA?: number;
};

type BookingChannels = OptionalBookingChannels & {
  GUIA_GO: number;
  GUIA_SCHEDULED: number;
  INTERNAL: number;
  WEBSITE_IMMEDIATE: number;
  WEBSITE_SCHEDULED: number;
};

type BookingsTotalByChannel = BookingChannels & {
  TOTALALLBOOKINGS: number;
};

type BookingsValueByChannel = BookingChannels & {
  TOTALALLVALUE: number;
};

type BookingsTicketAverageByChannel = BookingChannels & {
  TOTALALLTICKETAVERAGE: number;
};

type BookingsRepresentativenessByChannel = BookingChannels & {
  TOTALALLREPRESENTATIVENESS: number;
};

export type ReservationsTableData = {
  bookingsRepresentativenessByChannelType: BookingsRepresentativenessByChannel;
  bookingsRevenueByChannelType: BookingsValueByChannel;
  bookingsTicketAverageByChannelType: BookingsTicketAverageByChannel;
  bookingsTotalRentalsByChannelType: BookingsTotalByChannel;
};

type OptionalChannelKey = keyof OptionalBookingChannels;
type StandardChannelKey = Exclude<keyof BookingChannels, OptionalChannelKey>;

type ReservationsTableColumn = {
  key: "TOTAL" | StandardChannelKey | OptionalChannelKey;
  label: string;
};

export type ReservationsTableViewModel = {
  columns: ReservationsTableColumn[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
};

const STANDARD_COLUMNS: ReservationsTableColumn[] = [
  { key: "TOTAL", label: "Total de reservas" },
  { key: "WEBSITE_IMMEDIATE", label: "Site lush imediata" },
  { key: "WEBSITE_SCHEDULED", label: "Site lush programada" },
  { key: "GUIA_GO", label: "Guia Go" },
  { key: "GUIA_SCHEDULED", label: "Guia Programada" },
  { key: "INTERNAL", label: "Direta" },
];

const OPTIONAL_COLUMNS: Array<
  ReservationsTableColumn & { key: OptionalChannelKey }
> = [
  { key: "BOOKING", label: "Booking" },
  { key: "EXPEDIA", label: "Expedia" },
];

function formatPercent(value: unknown): string {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) {
    return "0.00%";
  }
  return `${numeric.toFixed(2)}%`;
}

function hasOptionalChannel(
  data: ReservationsTableData,
  channel: OptionalChannelKey,
) {
  return [
    data.bookingsTotalRentalsByChannelType,
    data.bookingsRevenueByChannelType,
    data.bookingsTicketAverageByChannelType,
    data.bookingsRepresentativenessByChannelType,
  ].some((row) => channel in row);
}

export function buildReservationsTableViewModel(
  data: ReservationsTableData,
  currencyConfig?: CurrencyConfig,
): ReservationsTableViewModel {
  const columns = [
    ...STANDARD_COLUMNS,
    ...OPTIONAL_COLUMNS.filter(({ key }) => hasOptionalChannel(data, key)),
  ];

  return {
    columns,
    rows: [
      {
        label: "Unidades Reservadas",
        values: columns.map(({ key }) =>
          String(
            key === "TOTAL"
              ? data.bookingsTotalRentalsByChannelType.TOTALALLBOOKINGS
              : (data.bookingsTotalRentalsByChannelType[key] ?? ""),
          ),
        ),
      },
      {
        label: "Receita Total",
        values: columns.map(({ key }) =>
          formatCurrency(
            key === "TOTAL"
              ? data.bookingsRevenueByChannelType.TOTALALLVALUE
              : (data.bookingsRevenueByChannelType[key] ?? ""),
            currencyConfig,
          ),
        ),
      },
      {
        label: "Ticket Médio",
        values: columns.map(({ key }) =>
          formatCurrency(
            key === "TOTAL"
              ? data.bookingsTicketAverageByChannelType.TOTALALLTICKETAVERAGE
              : (data.bookingsTicketAverageByChannelType[key] ?? ""),
            currencyConfig,
          ),
        ),
      },
      {
        label: "Representatividade",
        values: columns.map(({ key }) =>
          formatPercent(
            key === "TOTAL"
              ? data.bookingsRepresentativenessByChannelType
                  .TOTALALLREPRESENTATIVENESS
              : data.bookingsRepresentativenessByChannelType[key],
          ),
        ),
      },
    ],
  };
}
