import React, { useEffect, useState, useCallback } from "react";
import { View, Keyboard, Pressable, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "./WorkoutDayScreen.styles";
import ExerciseAccordion from "../../components/ExerciseAccordion/ExerciseAccordion";
import { ExerciseWithSets } from "../../types/ExerciseWithSets";
import { getWorkoutDayFull } from "../../db/exercise.repository";

const WorkoutDayScreen = ({ route }: any) => {
  const { workoutDayId } = route.params;

  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getWorkoutDayFull(workoutDayId);
    setExercises(data);
    setLoading(false);
  }, [workoutDayId]);

  const handleSetChange = (
    exerciseId: number,
    setId: number,
    field: "weight" | "reps" | "sets",
    value: string,
  ) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;

        return {
          ...ex,
          sets: ex.sets.map((s) =>
            s.id === setId
              ? {
                  ...s,
                  [field]: value.replace(/[^0-9.]/g, ""),
                }
              : s,
          ),
        };
      }),
    );
  };

  if (loading) return null;

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {exercises.map((exercise) => (
          <ExerciseAccordion
            key={exercise.id}
            exercise={exercise}
            onSetChange={handleSetChange}
          />
        ))}
      </ScrollView>
    </Pressable>
  );
};

export default WorkoutDayScreen;
