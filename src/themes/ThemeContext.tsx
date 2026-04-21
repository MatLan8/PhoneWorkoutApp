import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, Theme, Mode } from "./createTheme";
import { PaletteName } from "./palettes";

type ThemeContextType = {
  theme: Theme;
  mode: Mode;
  palette: PaletteName;
  setMode: (mode: Mode) => void;
  setPalette: (palette: PaletteName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  defaultPalette = "slate",
  defaultMode = "light",
}: {
  children: React.ReactNode;
  defaultPalette?: PaletteName;
  defaultMode?: Mode;
}) => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [palette, setPalette] = useState<PaletteName>(defaultPalette);

  const theme = useMemo(() => {
    return createTheme(palette, mode);
  }, [palette, mode]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      palette,
      setMode,
      setPalette,
    }),
    [theme, mode, palette],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
