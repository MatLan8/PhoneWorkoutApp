import { Text, View } from "react-native";
import { styles } from "./WorkoutDayScreen.styles";
import ExerciseItem from "../../components/ExerciseItem/ExerciseItem";
import { Exercise } from "../../types/Exercise";
import { useState, useEffect } from "react";

import { getExercisesByWorkoutDayId } from "../../db/exercise.repository";
import React from "react";

const WorkoutDayScreen = ({ route }: any) => {
  const { workoutDayId } = route.params;

  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const data = getExercisesByWorkoutDayId(workoutDayId);
    setExercises(data);
  }, [workoutDayId]);

  return (
    <View style={styles.container}>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </View>
  );
};

export default WorkoutDayScreen;
