import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createTheme, type Theme } from "./createTheme";
import type { PaletteName } from "./palettes";

type ThemeContextType = {
  theme: Theme;
  palette: PaletteName;
  setPalette: (palette: PaletteName) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = memo(
  ({
    children,
    defaultPalette = "NeutralDark",
  }: {
    children: React.ReactNode;
    defaultPalette?: PaletteName;
  }) => {
    const [palette, setPaletteState] = useState<PaletteName>(defaultPalette);

    const theme = useMemo(() => createTheme(palette), [palette]);

    const setPalette = useCallback(
      (newPalette: PaletteName) => setPaletteState(newPalette),
      [],
    );

    const value = useMemo(
      () => ({
        theme,
        palette,
        setPalette,
      }),
      [theme, palette, setPalette],
    );

    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  },
);

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
