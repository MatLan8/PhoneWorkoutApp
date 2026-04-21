import { useTheme } from "./ThemeContext";
import type { Theme } from "./createTheme";

// Returns the full Theme object (bg, text, ui, state groups).
// Use this in components: const colors = useColors();
export const useColors = (): Theme => {
  const { theme } = useTheme();
  return theme;
};
