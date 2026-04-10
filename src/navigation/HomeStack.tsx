import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import WorkoutDayScreen from "../screens/WorkoutDayScreen/WorkoutDayScreen";
import { colors } from "../styles/globalStyles";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colors.bg.primary },
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WorkoutDay" component={WorkoutDayScreen} />
    </Stack.Navigator>
  );
}
