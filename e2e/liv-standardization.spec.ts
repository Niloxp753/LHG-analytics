import { expect, test } from "@playwright/test";
import { LIV_USD_CURRENCY_CONFIG } from "../src/lib/currency-format";

function clearModule(modulePath: string) {
  delete require.cache[require.resolve(modulePath)];
}

function mockServerOnlyModule() {
  const serverOnlyPath = require.resolve("server-only");
  const previous = require.cache[serverOnlyPath];

  require.cache[serverOnlyPath] = {
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    exports: {},
    children: [],
    paths: [],
    parent: null,
    isPreloading: false,
    path: serverOnlyPath,
    require,
  } as unknown as NodeModule;

  return () => {
    if (previous) {
      require.cache[serverOnlyPath] = previous;
      return;
    }

    delete require.cache[serverOnlyPath];
  };
}

test.describe("LIV standard unit contract", () => {
  test("the shared reservations table model preserves LIV currency and available channels", () => {
    const livData = {
      bookingsTotalRentalsByChannelType: {
        TOTALALLBOOKINGS: 10,
        WEBSITE_IMMEDIATE: 2,
        WEBSITE_SCHEDULED: 2,
        GUIA_GO: 2,
        GUIA_SCHEDULED: 2,
        INTERNAL: 2,
      },
      bookingsRevenueByChannelType: {
        TOTALALLVALUE: 1500,
        WEBSITE_IMMEDIATE: 300,
        WEBSITE_SCHEDULED: 300,
        GUIA_GO: 300,
        GUIA_SCHEDULED: 300,
        INTERNAL: 300,
      },
      bookingsTicketAverageByChannelType: {
        TOTALALLTICKETAVERAGE: 150,
        WEBSITE_IMMEDIATE: 150,
        WEBSITE_SCHEDULED: 150,
        GUIA_GO: 150,
        GUIA_SCHEDULED: 150,
        INTERNAL: 150,
      },
      bookingsRepresentativenessByChannelType: {
        TOTALALLREPRESENTATIVENESS: 100,
        WEBSITE_IMMEDIATE: 20,
        WEBSITE_SCHEDULED: 20,
        GUIA_GO: 20,
        GUIA_SCHEDULED: 20,
        INTERNAL: 20,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { buildReservationsTableViewModel } = require(
      "../src/app/(dashboard)/_components/kpis/reservations-table-view-model"
    ) as {
      buildReservationsTableViewModel: (
        data: typeof livData,
        currencyConfig: typeof LIV_USD_CURRENCY_CONFIG,
      ) => {
        columns: Array<{ label: string }>;
        rows: Array<{ label: string; values: string[] }>;
      };
    };

    const viewModel = buildReservationsTableViewModel(
      livData,
      LIV_USD_CURRENCY_CONFIG,
    );

    expect(viewModel.columns.map(({ label }) => label)).toEqual([
      "Total de reservas",
      "Site lush imediata",
      "Site lush programada",
      "Guia Go",
      "Guia Programada",
      "Direta",
    ]);
    expect(viewModel.rows[1].label).toBe("Receita Total");
    expect(viewModel.rows[1].values[0]).toMatch(/\$[^0-9]*1\.500,00/);
    expect(JSON.stringify(viewModel)).not.toContain("R$");
  });

  test("the standard unit client routes LIV requests to its dedicated endpoint", async () => {
    const originalFetch = global.fetch;
    const originalConsolidatedEndpoint =
      process.env.BACKEND_CONSOLIDATED_ENDPOINT;
    const originalLivEndpoint = process.env.BACKEND_ENDPOINT_LIV;
    const fetchCalls: string[] = [];

    process.env.BACKEND_CONSOLIDATED_ENDPOINT =
      "http://consolidated.test/api";
    process.env.BACKEND_ENDPOINT_LIV = "http://liv.test/api";

    const restoreServerOnly = mockServerOnlyModule();
    global.fetch = (async (input: RequestInfo | URL) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof Request
            ? input.url
            : input.toString();
      fetchCalls.push(url);

      return new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof global.fetch;

    try {
      clearModule("../src/http/api-client");

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { getUnitApiClient } = require("../src/http/api-client") as {
        getUnitApiClient: (company: string) => {
          get: (path: string) => Promise<Response>;
        };
      };

      await getUnitApiClient("liv").get("Company/kpis/date-range");

      expect(fetchCalls).toEqual([
        "http://liv.test/api/Company/kpis/date-range",
      ]);
    } finally {
      global.fetch = originalFetch;

      if (originalConsolidatedEndpoint === undefined) {
        delete process.env.BACKEND_CONSOLIDATED_ENDPOINT;
      } else {
        process.env.BACKEND_CONSOLIDATED_ENDPOINT =
          originalConsolidatedEndpoint;
      }

      if (originalLivEndpoint === undefined) {
        delete process.env.BACKEND_ENDPOINT_LIV;
      } else {
        process.env.BACKEND_ENDPOINT_LIV = originalLivEndpoint;
      }

      clearModule("../src/http/api-client");
      restoreServerOnly();
    }
  });
});
