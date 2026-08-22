import colors from "tailwindcss/colors";

export type ChartPaletteMode = "default" | "units";

type UnitColorToken = {
  accent: string;
  canonicalLabel: string;
  series: string;
};

type UnitColorKey =
  | "ipiranga"
  | "lapa"
  | "tout"
  | "andarDeCima"
  | "liv"
  | "altana"
  | "getanGaravelo"
  | "getanParqueOeste";

export const UNIT_CHART_COLORS: Record<UnitColorKey, UnitColorToken> = {
  ipiranga: {
    canonicalLabel: "Lush Ipiranga",
    series: colors.violet[400],
    accent: colors.violet[600],
  },
  lapa: {
    canonicalLabel: "Lush Lapa",
    series: colors.blue[400],
    accent: colors.blue[600],
  },
  tout: {
    canonicalLabel: "Tout",
    series: colors.indigo[400],
    accent: colors.indigo[600],
  },
  andarDeCima: {
    canonicalLabel: "Andar de Cima",
    series: colors.fuchsia[400],
    accent: colors.fuchsia[600],
  },
  liv: {
    canonicalLabel: "LIV",
    series: colors.rose[400],
    accent: colors.rose[600],
  },
  altana: {
    canonicalLabel: "Altana",
    series: colors.orange[400],
    accent: colors.orange[600],
  },
  getanGaravelo: {
    canonicalLabel: "Getan Garavelo",
    series: colors.yellow[400],
    accent: colors.yellow[600],
  },
  getanParqueOeste: {
    canonicalLabel: "Getan Parque Oeste",
    series: colors.lime[400],
    accent: colors.lime[600],
  },
};

const UNIT_COLOR_KEY_BY_ALIAS: Record<string, UnitColorKey> = {
  ipiranga: "ipiranga",
  "lush ipiranga": "ipiranga",
  lapa: "lapa",
  "lush lapa": "lapa",
  tout: "tout",
  "andar de cima": "andarDeCima",
  andardecima: "andarDeCima",
  liv: "liv",
  altana: "altana",
  "getan garavelo": "getanGaravelo",
  getan_garavelo: "getanGaravelo",
  getangaravelo: "getanGaravelo",
  "getan parque oeste": "getanParqueOeste",
  "getan pq oeste": "getanParqueOeste",
  getan_pq_oeste: "getanParqueOeste",
  getanpqoeste: "getanParqueOeste",
};

function normalizeLabelToken(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function resolveUnitColorKey(
  label?: string | null,
): UnitColorKey | null {
  if (!label) {
    return null;
  }

  return UNIT_COLOR_KEY_BY_ALIAS[normalizeLabelToken(label)] ?? null;
}

export function normalizeUnitLabel(label: string) {
  const unitKey = resolveUnitColorKey(label);

  return unitKey ? UNIT_CHART_COLORS[unitKey].canonicalLabel : label;
}

export function resolveUnitPaletteFromLabels(labels?: string[]) {
  if (!Array.isArray(labels)) {
    return [];
  }

  return labels.map((label) => {
    const unitKey = resolveUnitColorKey(label);

    return unitKey ? UNIT_CHART_COLORS[unitKey].series : undefined;
  });
}

export function resolveUnitAccentPaletteFromLabels(labels?: string[]) {
  if (!Array.isArray(labels)) {
    return [];
  }

  return labels.map((label) => {
    const unitKey = resolveUnitColorKey(label);

    return unitKey ? UNIT_CHART_COLORS[unitKey].accent : undefined;
  });
}

export function resolveChartPalette({
  palette = "default",
  labels,
  seriesNames,
  fallbackSeriesColors,
  fallbackAccentColors,
}: {
  fallbackAccentColors: string[];
  fallbackSeriesColors: string[];
  labels?: string[];
  palette?: ChartPaletteMode;
  seriesNames?: string[];
}) {
  if (palette !== "units") {
    return {
      seriesColors: fallbackSeriesColors,
      accentColors: fallbackAccentColors,
    };
  }

  const identityLabels =
    Array.isArray(seriesNames) && seriesNames.length > 0 ? seriesNames : labels;
  const seriesColors = resolveUnitPaletteFromLabels(identityLabels);
  const accentColors = resolveUnitAccentPaletteFromLabels(identityLabels);

  if (
    seriesColors.length === 0 ||
    seriesColors.some((color) => typeof color !== "string") ||
    accentColors.some((color) => typeof color !== "string")
  ) {
    return {
      seriesColors: fallbackSeriesColors,
      accentColors: fallbackAccentColors,
    };
  }

  return {
    seriesColors: seriesColors as string[],
    accentColors: accentColors as string[],
  };
}
