import { View, Pressable } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./ThemePicker.style";
import { useColors } from "../../themes/colors";
import { Ionicons } from "@expo/vector-icons";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const ITEM_COUNT = 6;
const ITEM_SIZE = 30;
const GAP = 10;
const PADDING = 20;

const CONTENT_HEIGHT =
  ITEM_COUNT * ITEM_SIZE + (ITEM_COUNT - 1) * GAP + PADDING;

const ThemePicker = () => {
  const colors = useColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const progress = useSharedValue(0);

  const toggle = () => {
    progress.value = withTiming(progress.value === 0 ? 1 : 0, {
      duration: 280,
    });
  };

  // 🔥 Morphing container (THIS is the pill)
  const containerAnim = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [50, 50 + CONTENT_HEIGHT]),

      borderRadius: interpolate(progress.value, [0, 1], [999, 30]),
    };
  });

  // 🔥 Content reveal animation
  const contentAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.2, 1], [0, 1, 1]),
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [-10, 0]),
        },
      ],
    };
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, containerAnim]}>
        {/* HEADER / BUTTON */}
        <Pressable style={styles.header} onPress={toggle}>
          <Ionicons name="color-palette-outline" size={28} color="white" />
        </Pressable>

        {/* DROPDOWN CONTENT (inside SAME container) */}
        <Animated.View style={[styles.content, contentAnim]}>
          <Pressable style={styles.circle} />
          <Pressable style={styles.circle} />
          <Pressable style={styles.circle} />
          <Pressable style={styles.circle} />
          <Pressable style={styles.circle} />
          <Pressable style={styles.circle} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ThemePicker;
