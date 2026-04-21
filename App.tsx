import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TabNavigator from "./src/navigation/TabNavigator";
import { useTheme } from "./src/themes/ThemeContext";
import { useColors } from "./src/themes/colors";
import { View, Text } from "react-native";

import { ThemeProvider } from "./src/themes/ThemeContext";

import { initDatabase } from "./src/db/database";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

import { NavigationBar } from "@zoontek/react-native-navigation-bar";

initDatabase();

export default function App() {
  return (
    <ThemeProvider defaultPalette="neutral" defaultMode="dark">
      <Root />
    </ThemeProvider>
  );
}

function Root() {
  const colors = useColors();
  const { mode } = useTheme(); // grab mode too
  const [fontsLoaded] = useFonts({
    AvantGardeNormal: require("./assets/fonts/AVGARDN_2.ttf"),
    AvantGardeDemi: require("./assets/fonts/AVGARDD_2.ttf"),
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.bg.primary }}
    >
      <SafeAreaProvider>
        <StatusBar style={mode === "dark" ? "light" : "dark"} />
        <NavigationBar barStyle="light-content" />
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
