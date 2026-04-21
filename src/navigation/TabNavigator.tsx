import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CurvedBottomTabs } from "../reactitcx_Components/CurvedBottomTabs/CurvedBottomTabs";
import HomeStack from "./HomeStack";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
//import { colors } from "../styles/globalStyles";

import { useColors } from "../themes/colors";

const Tab = createBottomTabNavigator();

function SafeCurvedBottomTabs(props: any) {
  const insets = useSafeAreaInsets();
  console.log(insets);

  return (
    <View
      style={{
        marginBottom: insets.bottom,
      }}
    >
      <CurvedBottomTabs {...props} />
    </View>
  );
}

export default function TabNavigator() {
  const colors = useColors();
  return (
    <Tab.Navigator
      tabBar={(props) => <SafeCurvedBottomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={20}
              color={focused ? "#FFFFFF" : "#B9B9B9"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: "Stats",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={20}
              color={focused ? "#FFFFFF" : "#B9B9B9"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
