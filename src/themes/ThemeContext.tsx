import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createTheme, type Theme, type Mode } from "./createTheme";
import type { PaletteName } from "./palettes";

type ThemeContextType = {
  theme: Theme;
  mode: Mode;
  palette: PaletteName;
  setMode: (mode: Mode) => void;
  setPalette: (palette: PaletteName) => void;
  isDark: boolean;
  isLight: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = memo(
  ({
    children,
    defaultMode = "dark",
    defaultPalette = "Neutral",
  }: {
    children: React.ReactNode;
    defaultMode?: Mode;
    defaultPalette?: PaletteName;
  }) => {
    const [mode, setModeState] = useState<Mode>(defaultMode);
    const [palette, setPaletteState] = useState<PaletteName>(defaultPalette);

    const theme = useMemo(() => createTheme(palette, mode), [palette, mode]);

    const setMode = useCallback((newMode: Mode) => setModeState(newMode), []);
    const setPalette = useCallback(
      (newPalette: PaletteName) => setPaletteState(newPalette),
      [],
    );

    const value = useMemo(
      () => ({
        theme,
        mode,
        palette,
        setMode,
        setPalette,
        isDark: mode === "dark",
        isLight: mode === "light",
      }),
      [theme, mode, palette, setMode, setPalette],
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
