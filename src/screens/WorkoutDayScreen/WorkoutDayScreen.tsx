import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Keyboard, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./WorkoutDayScreen.styles";
import ExerciseAccordion from "../../components/ExerciseAccordion/ExerciseAccordion";
import { ExerciseWithSets } from "../../types/ExerciseWithSets";
import { getWorkoutDayFull } from "../../db/exercise.repository";

import { CountupTimer } from "../../reactitcx_Components/CountUpTimer/CountupTimer";
import { colors } from "../../styles/globalStyles";

const WorkoutDayScreen = ({ route }: any) => {
  const { workoutDay } = route.params;

  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getWorkoutDayFull(workoutDay.id);
    setExercises(data);
    setLoading(false);
  }, [workoutDay.id]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{workoutDay.name}</Text>
        <CountupTimer
          isRunning={true}
          initialSeconds={3590}
          size="small"
          customization={{
            labelColor: colors.bg.primary,
            numberColor: colors.bg.primary,
            separatorColor: colors.bg.primary,
          }}
        />
      </View>
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.exerciseContainer}
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
    </SafeAreaView>
  );
};

export default WorkoutDayScreen;
