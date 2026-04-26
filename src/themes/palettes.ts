type PaletteScale = Record<
  | "dark1"
  | "dark2"
  | "dark3"
  | "dark4"
  | "dark5"
  | "dark6"
  | "dark7"
  | "dark8"
  | "dark9"
  | "dark10"
  | "dark11",
  string
>;

export const palettes: Record<string, PaletteScale> = {
  Red: {
    dark1: "#fef2f2",
    dark2: "#fee2e2",
    dark3: "#fecaca",
    dark4: "#fca5a5",
    dark5: "#f87171",
    dark6: "#ef4444",
    dark7: "#dc2626",
    dark8: "#b91c1c",
    dark9: "#991b1b",
    dark10: "#7f1d1d",
    dark11: "#450a0a",
  },
  Emerald: {
    dark1: "#ecfdf5",
    dark2: "#d1fae5",
    dark3: "#a7f3d0",
    dark4: "#6ee7b7",
    dark5: "#34d399",
    dark6: "#10b981",
    dark7: "#059669",
    dark8: "#047857",
    dark9: "#065f46",
    dark10: "#064e3b",
    dark11: "#022c22",
  },
  Teal: {
    dark1: "#f0fdfa",
    dark2: "#ccfbf1",
    dark3: "#99f6e4",
    dark4: "#5eead4",
    dark5: "#2dd4bf",
    dark6: "#14b8a6",
    dark7: "#0d9488",
    dark8: "#0f766e",
    dark9: "#115e59",
    dark10: "#134e4a",
    dark11: "#042f2e",
  },
  Indigo: {
    dark1: "#eef2ff",
    dark2: "#e0e7ff",
    dark3: "#c7d2fe",
    dark4: "#a5b4fc",
    dark5: "#818cf8",
    dark6: "#6366f1",
    dark7: "#4f46e5",
    dark8: "#4338ca",
    dark9: "#3730a3",
    dark10: "#312e81",
    dark11: "#1e1b4b",
  },
  NeutralLight: {
    dark1: "#0a0a0a",
    dark2: "#171717",
    dark3: "#262626",
    dark4: "#404040",
    dark5: "#525252",
    dark6: "#737373",
    dark7: "#a3a3a3",
    dark8: "#d4d4d4",
    dark9: "#e5e5e5",
    dark10: "#f5f5f5",
    dark11: "#fafafa",
  },
  NeutralDark: {
    dark1: "#fafafa",
    dark2: "#f5f5f5",
    dark3: "#e5e5e5",
    dark4: "#d4d4d4",
    dark5: "#a3a3a3",
    dark6: "#737373",
    dark7: "#525252",
    dark8: "#404040",
    dark9: "#262626",
    dark10: "#171717",
    dark11: "#0a0a0a",
  },
  Olive: {
    dark1: "#fbfbf9",
    dark2: "#f4f4f0",
    dark3: "#e8e8e3",
    dark4: "#d8d8d0",
    dark5: "#abab9c",
    dark6: "#7c7c67",
    dark7: "#5b5b4b",
    dark8: "#474739",
    dark9: "#2b2b22",
    dark10: "#1d1d16",
    dark11: "#0c0c09",
  },
};

export type Shade = keyof PaletteScale;
export type PaletteName = keyof typeof palettes;
