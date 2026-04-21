import { palettes, PaletteName, Shade } from "./palettes";

export type Mode = "light" | "dark";

const pick = (
  palette: Record<string, string>,
  light: Shade,
  dark: Shade,
  isDark: boolean,
) => {
  return isDark ? palette[dark] : palette[light];
};

export const createTheme = (paletteName: PaletteName, mode: Mode) => {
  const palette = palettes[paletteName];
  const isDark = mode === "dark";

  return {
    mode,
    palette: paletteName,

    bg: {
      primary: pick(palette, "50", "950", isDark),
      secondary: pick(palette, "100", "900", isDark),
      tertiary: pick(palette, "200", "800", isDark),
      quaternary: pick(palette, "300", "700", isDark),
    },

    text: {
      primary: pick(palette, "950", "50", isDark),
      secondary: pick(palette, "800", "200", isDark),
      muted: pick(palette, "600", "400", isDark),
      subtle: pick(palette, "500", "500", isDark),
    },

    ui: {
      border: pick(palette, "200", "800", isDark),
      divider: pick(palette, "300", "700", isDark),
      disabled: pick(palette, "400", "600", isDark),
      hover: pick(palette, "100", "900", isDark),
      active: pick(palette, "200", "800", isDark),
    },

    state: {
      success: palettes.green[isDark ? 400 : 500],
      warning: palettes.orange?.[isDark ? 400 : 500] ?? "#000",
      error: palettes.red[isDark ? 400 : 500],
      info: palettes.blue[isDark ? 400 : 500],
    },
  };
};

export type Theme = ReturnType<typeof createTheme>;
