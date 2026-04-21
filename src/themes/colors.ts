import { useTheme } from "./ThemeContext";

export const useColors = () => {
  const { theme } = useTheme();
  return theme;
};
