import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TabNavigator from "./src/navigation/TabNavigator";
import { useColors } from "./src/themes/colors";
import { AnimatedThemeProvider } from "./src/components/ThemeSwitch/AnimatedThemeProvider";

import { initDatabase } from "./src/db/database";
import { NavigationBar } from "@zoontek/react-native-navigation-bar";

initDatabase();

export default function App() {
  return (
    <AnimatedThemeProvider defaultPalette="NeutralDark">
      <Root />
    </AnimatedThemeProvider>
  );
}

function Root() {
  const colors = useColors();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.bg.primary }}
    >
      <SafeAreaProvider>
        <StatusBar
          style={colors.palette === "NeutralLight" ? "dark" : "light"}
        />
        <NavigationBar
          barStyle={
            colors.palette === "NeutralLight" ? "dark-content" : "light-content"
          }
        />
        <NavigationContainer
          theme={{
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              background: colors.bg.primary,
              card: colors.bg.primary,
            },
          }}
        >
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
