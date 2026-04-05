import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { styles } from "./HomeScreen.styles";
import WorkoutDayCard from "../../components/WorkoutDayCard/WorkoutDayCard";

import { getAllWorkoutDays } from "../../db/workout.repository";
import { WorkoutDay } from "../../types/WorkoutDay";

const HomeScreen = ({ navigation }: any) => {
  const [days, setDays] = useState<WorkoutDay[]>([]);
  useEffect(() => {
    const data = getAllWorkoutDays();
    setDays(data);
  }, []);
  return (
    <View style={styles.container}>
      {days.map((day) => (
        <WorkoutDayCard
          key={day.id}
          dayName={day.name}
          color={day.color}
          onPress={() =>
            navigation.navigate("WorkoutDay", { workoutDayId: day.id })
          }
        />
      ))}
    </View>
  );
};

export default HomeScreen;
