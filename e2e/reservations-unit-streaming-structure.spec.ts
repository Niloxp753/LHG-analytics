import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

const STREAMED_UNIT_PAGES = [
  "altana",
  "andardecima",
  "getangaravelo",
  "getanpqoeste",
  "liv",
  "lushipiranga",
  "lushlapa",
  "tout",
] as const;

function readUnitPageSource(unit: (typeof STREAMED_UNIT_PAGES)[number]) {
  return readFileSync(
    path.join(
      process.cwd(),
      "src",
      "app",
      "(dashboard)",
      "reservations",
      "(unidades)",
      unit,
      "page.tsx",
    ),
    "utf8",
  );
}

test.describe("Reservations unit streaming structure", () => {
  for (const unit of STREAMED_UNIT_PAGES) {
    test(`${unit} page streams unit content from a nested server component`, async () => {
      const source = readUnitPageSource(unit);

      expect(source).toContain("Suspense");
      expect(source).not.toContain("getReservationsAction(");
      expect(source).not.toContain("getReservationsCustomAction(");
      expect(source).not.toContain("getLivReservationsPageData(");
      expect(source).not.toContain("const resp = await");
    });
  }
});
