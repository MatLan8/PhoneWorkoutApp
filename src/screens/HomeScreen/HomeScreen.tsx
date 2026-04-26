import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import React from "react";
import { styles } from "./HomeScreen.styles";
import { useTheme } from "../../themes/ThemeContext";

import WorkoutDayCard from "../../components/WorkoutDayCard/WorkoutDayCard";
import EditWorkoutDayBottomSheet from "../../components/EditWorkoutDayBottomSheet/EditWorkoutDayBottomSheet";

import { getAllWorkoutDays } from "../../db/workout.repository";
import { WorkoutDay } from "../../types/WorkoutDay";

const HomeScreen = ({ navigation }: any) => {
  const { setPalette } = useTheme();
  const [days, setDays] = useState<WorkoutDay[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false); // control bottom sheet visibility
  useEffect(() => {
    const data = getAllWorkoutDays();
    setDays(data);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {days.map((day) => (
        <WorkoutDayCard
          key={day.id}
          dayName={day.name}
          color={day.color}
          onPress={() => navigation.navigate("WorkoutDay", { workoutDay: day })}
        />
      ))}

      <Button title="Stats" onPress={() => navigation.navigate("Stats")} />
      <Button title="Edit Workout Day" onPress={() => setSheetVisible(true)} />
      <Button title="Test" onPress={() => navigation.navigate("Test")} />
      <Button title="Test2" onPress={() => navigation.navigate("Test2")} />

      <Button title="Emerald" onPress={() => setPalette("Emerald")} />
      <Button title="NeutralDark" onPress={() => setPalette("NeutralDark")} />
      <Button title="NeutralLight" onPress={() => setPalette("NeutralLight")} />
      <EditWorkoutDayBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      ></EditWorkoutDayBottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
