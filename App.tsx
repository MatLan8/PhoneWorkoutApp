import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initDatabase } from "./src/db/database";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

import { colors } from "./src/styles/globalStyles";

import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import WorkoutDayScreen from "./src/screens/WorkoutDayScreen/WorkoutDayScreen";

const Stack = createNativeStackNavigator();

initDatabase();

export default function App() {
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
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: { backgroundColor: colors.bg.primary },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WorkoutDay" component={WorkoutDayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
