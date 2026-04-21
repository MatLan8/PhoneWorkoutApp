import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";

import { useMemo } from "react";
import { useColors } from "../../themes/colors";
import { createStyles } from "./ExerciseAccordion.styles";

import { ExerciseWithSets } from "../../types/ExerciseWithSets";
import ExerciseSetRow from "../ExerciseSetRow/ExerciseSetRow";

const DURATION = 600;
const MAX_HEIGHT = 10000;

const ExerciseAccordion = ({
  exercise,
  onSetChange, // 👈 IMPORTANT
}: {
  exercise: ExerciseWithSets;
  onSetChange: (
    exerciseId: number,
    setId: number,
    field: "weight" | "reps" | "sets",
    value: string,
  ) => void;
}) => {
  const colors = useColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isOpen, setIsOpen] = useState(false);
  const progress = useSharedValue(0);

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
      {/* HEADER */}
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

      {/* CONTENT */}
      <Animated.View style={animatedContentStyle}>
        <View style={styles.content}>
          <View style={styles.breakLine} />
          <View style={styles.setsHeader}>
            <Text style={styles.statName}>Weight</Text>
            <Text style={styles.statName}>Reps</Text>
            <Text style={styles.statName}>Sets</Text>
            <View style={styles.emptyCol} />
          </View>
          {exercise.sets.map((set) => (
            <ExerciseSetRow
              key={set.id}
              set={set}
              onChange={onSetChange}
              exerciseId={exercise.id}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default ExerciseAccordion;
