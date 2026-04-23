import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TabNavigator from "./src/navigation/TabNavigator";
import { ThemeSheetProvider } from "./src/themeSheet/ThemeSheetHost";
import { useTheme } from "./src/themes/ThemeContext";
import { useColors } from "./src/themes/colors";
import { AnimatedThemeProvider } from "./src/components/ThemeSwitch/AnimatedThemeProvider";

import { initDatabase } from "./src/db/database";
import { NavigationBar } from "@zoontek/react-native-navigation-bar";

initDatabase();

export default function App() {
  return (
    <AnimatedThemeProvider defaultPalette="Neutral" defaultMode="dark">
      <Root />
    </AnimatedThemeProvider>
  );
}

function Root() {
  const colors = useColors();
  const { mode } = useTheme();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.bg.primary }}
    >
      <SafeAreaProvider>
        <ThemeSheetProvider>
          <StatusBar style={mode === "dark" ? "light" : "dark"} />
          <NavigationBar
            barStyle={mode === "dark" ? "light-content" : "dark-content"}
          />
          <NavigationContainer
            theme={{
              ...(mode === "dark" ? DarkTheme : DefaultTheme),
              colors: {
                ...(mode === "dark" ? DarkTheme.colors : DefaultTheme.colors),
                background: colors.bg.primary,
                card: colors.bg.primary,
              },
            }}
          >
            <TabNavigator />
          </NavigationContainer>
        </ThemeSheetProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
