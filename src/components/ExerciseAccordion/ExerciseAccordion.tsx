import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";

import { styles } from "./ExerciseAccordion.styles";

const DURATION = 600;
const MAX_HEIGHT = 500; // set higher than your content will ever be

export default function ExerciseAccordion() {
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
      {/* ── TRIGGER ROW ───────────────────────────────────────────────── */}
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
      >
        {/* ┌─ PUT YOUR CLOSED/HEADER CONTENT HERE ─────────────────────── */}
        <Text>Accordion</Text>
        {/* └────────────────────────────────────────────────────────────── */}

        <Animated.View style={[styles.chevron, animatedChevronStyle]} />
      </Pressable>

      {/* ── EXPANDED CONTENT ──────────────────────────────────────────── */}
      <Animated.View style={animatedContentStyle}>
        {/* ┌─ PUT YOUR OPENED/EXPANDED CONTENT HERE ─────────────────── */}
        <View style={styles.content}>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
          <Text>Accordion open</Text>
        </View>
        {/* └────────────────────────────────────────────────────────────── */}
      </Animated.View>
    </View>
  );
}
