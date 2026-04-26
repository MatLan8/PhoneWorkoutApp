import { palettes, PaletteName, Shade } from "./palettes";


export const createTheme = (paletteName: PaletteName) => {
  const palette = palettes[paletteName];

  return {
    palette: paletteName,

    bg: {
      primary: palette["dark11"],
      secondary: palette["dark10"],
      tertiary: palette["dark9"],
    },

    text: {
      primary: palette["dark1"],
      secondary: palette["dark2"],
      muted: palette["dark5"],
      subtle: palette["dark6"],
    },

    ui: {
      border: palette["dark9"],
      divider: palette["dark8"],
      disabled: palette["dark7"],
      hover: palette["dark10"],
      active: palette["dark9"],
    },

    state: {},
  };
};

export type Theme = ReturnType<typeof createTheme>;
