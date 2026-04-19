import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import React from "react";
import { styles } from "./HomeScreen.styles";

import WorkoutDayCard from "../../components/WorkoutDayCard/WorkoutDayCard";
import EditWorkoutDayBottomSheet from "../../components/EditWorkoutDayBottomSheet/EditWorkoutDayBottomSheet";

import { getAllWorkoutDays } from "../../db/workout.repository";
import { WorkoutDay } from "../../types/WorkoutDay";

const HomeScreen = ({ navigation }: any) => {
  const [days, setDays] = useState<WorkoutDay[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false); // control bottom sheet visibility
  const [open, setOpen] = useState(false);
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

      <EditWorkoutDayBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      ></EditWorkoutDayBottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
