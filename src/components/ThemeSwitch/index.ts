// Animation layer
export { AnimatedThemeProvider, useToggleTheme } from "./AnimatedThemeProvider";
export { ThemeSwitcher } from "./ThemeSwitcher";
export * from "./types";

// Theme layer — re-exported so consumers only need one import source
export { useTheme, ThemeContext } from "../../themes/ThemeContext";
export { useColors } from "../../themes/colors";
export type { Theme } from "../../themes/createTheme";
export type { PaletteName } from "../../themes/palettes";
