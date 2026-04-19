import React, { useEffect, useState, useCallback } from "react";
import { View, Keyboard, Pressable } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "./WorkoutDayScreen.styles";
import ExerciseAccordion from "../../components/ExerciseAccordion/ExerciseAccordion";
import { ExerciseWithSets } from "../../types/ExerciseWithSets";
import { getWorkoutDayFull } from "../../db/exercise.repository";

const WorkoutDayScreen = ({ route }: any) => {
  const { workoutDayId } = route.params;

  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const [loading, setLoading] = useState(true);

  // ── LOAD DATA ONCE ─────────────────────────────────────────────
  useEffect(() => {
    const data = getWorkoutDayFull(workoutDayId);
    setExercises(data);
    setLoading(false);
  }, [workoutDayId]);

  // ── DRAG END HANDLER ───────────────────────────────────────────
  const handleDragEnd = useCallback(({ data }: any) => {
    setExercises(data);
  }, []);

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

  // ── RENDER ITEM (memo-safe) ────────────────────────────────────
  const renderItem = useCallback(({ item, drag, isActive }: any) => {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <ExerciseAccordion
          exercise={item}
          dragHandle={
            <Pressable onLongPress={drag} delayLongPress={150} hitSlop={12}>
              <MaterialCommunityIcons
                name="drag-vertical-variant"
                size={22}
                color="#999"
              />
            </Pressable>
          }
          onSetChange={handleSetChange}
        />
      </View>
    );
  }, []);

  // ── LOADING GUARD ──────────────────────────────────────────────
  if (loading) return null;

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <DraggableFlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onDragEnd={handleDragEnd}
          activationDistance={10}
          dragItemOverflow={true}
        />
      </View>
    </Pressable>
  );
};

export default WorkoutDayScreen;
