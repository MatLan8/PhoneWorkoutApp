import React, { useState, useEffect } from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";

import { Exercise, ExerciseSet } from "../../types/Exercise";
import { getExerciseSetsByExerciseId } from "../../db/exercise.repository";
import ExerciseSetRow from "../ExerciseSetRow/ExerciseSetRow";

import { styles } from "./ExerciseAccordion.styles";

const DURATION = 600;
const MAX_HEIGHT = 1000; // set higher than your content will ever be

type SetRow = ExerciseSet & {
  weightInput: string;
  repsInput: string;
  setsInput: string;
};

const ExerciseAccordion = ({ exercise }: { exercise: Exercise }) => {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useSharedValue(0);

  const [sets, setSets] = useState<SetRow[]>([]);

  useEffect(() => {
    const data = getExerciseSetsByExerciseId(exercise.id);
    setSets(
      data.map((s) => ({
        ...s,
        weightInput: s.weight.toString(),
        repsInput: s.reps.toString(),
        setsInput: s.sets.toString(),
      })),
    );
  }, [exercise.id]);

  const handleChange = (
    id: number,
    field: keyof Pick<ExerciseSet, "weight" | "reps" | "sets">,
    value: string,
  ) => {
    const numeric = value.replace(/[^0-9.]/g, "");
    setSets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [`${field}Input`]: numeric } : s)),
    );
  };

  const toggle = () => {
    const next = !isOpen;
    progress.value = withTiming(next ? 1 : 0, {
      duration: DURATION,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
    setIsOpen(next);
  };

  const animatedContentStyle = useAnimatedStyle(() => ({
    maxHeight: interpolate(progress.value, [0, 1], [0, MAX_HEIGHT]),
    opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0.5, 1]),
    overflow: "hidden",
  }));

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.value, [0, 1], [45, 225])}deg`,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* ── TRIGGER ROW ───────────────────────────────────────────────── */}
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
      >
        <Text style={styles.headerText}>{exercise.name}</Text>

        <Animated.View style={[styles.chevron, animatedChevronStyle]} />
      </Pressable>

      {/* ── EXPANDED CONTENT ──────────────────────────────────────────── */}
      <Animated.View style={animatedContentStyle}>
        <View style={styles.content}>
          <View style={styles.breakLine} />
          {sets.map((set) => (
            <ExerciseSetRow key={set.id} set={set} onChange={handleChange} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default ExerciseAccordion;
