import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TabNavigator from "./src/navigation/TabNavigator";
import { colors } from "./src/styles/globalStyles";

import { initDatabase } from "./src/db/database";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

const Stack = createStackNavigator();

initDatabase();

export default function App() {
  const [fontsLoaded] = useFonts({
    AvantGardeNormal: require("./assets/fonts/AVGARDN_2.ttf"),
    AvantGardeDemi: require("./assets/fonts/AVGARDD_2.ttf"),
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: "colors.bg.primary" }}
    >
      <SafeAreaProvider>
        <StatusBar style="light" translucent />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
