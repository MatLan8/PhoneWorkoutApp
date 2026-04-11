import { ScrollView, View } from "react-native";
import { Keyboard, Pressable } from "react-native";
import { styles } from "./WorkoutDayScreen.styles";
import ExerciseItem from "../../components/ExerciseItem/ExerciseItem";
import ExerciseAccordion from "../../components/ExerciseAccordion/ExerciseAccordion";
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
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {exercises.map((exercise) => (
          <ExerciseAccordion key={exercise.id} exercise={exercise} />
        ))}
      </ScrollView>
    </Pressable>
  );
};

export default WorkoutDayScreen;
