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
      primary: pick(palette, "dark11", "dark1", isDark),
      secondary: pick(palette, "dark10", "dark2", isDark),
      tertiary: pick(palette, "dark9", "dark3", isDark),
    },

    text: {
      primary: pick(palette, "dark1", "dark11", isDark),
      secondary: pick(palette, "dark2", "dark10", isDark),
      muted: pick(palette, "dark5", "dark7", isDark),
      subtle: pick(palette, "dark6", "dark6", isDark),
    },

    ui: {
      border: pick(palette, "dark9", "dark3", isDark),
      divider: pick(palette, "dark8", "dark4", isDark),
      disabled: pick(palette, "dark7", "dark5", isDark),
      hover: pick(palette, "dark10", "dark2", isDark),
      active: pick(palette, "dark9", "dark3", isDark),
    },

    state: {
      success: palettes.Green[isDark ? "dark7" : "dark6"],
      warning: palettes.Orange[isDark ? "dark7" : "dark6"],
      error: palettes.Red[isDark ? "dark7" : "dark6"],
      info: palettes.Blue[isDark ? "dark7" : "dark6"],
    },
  };
};

export type Theme = ReturnType<typeof createTheme>;
