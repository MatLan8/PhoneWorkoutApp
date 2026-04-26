import { View, Pressable, GestureResponderEvent } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./ThemePicker.style";
import { useColors } from "../../themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { palettes, type PaletteName } from "../../themes/palettes";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import { useToggleTheme, AnimationType } from "../../components/ThemeSwitch";

const PALETTE_NAMES = Object.keys(palettes) as PaletteName[];

const ITEM_COUNT = PALETTE_NAMES.length;
const ITEM_SIZE = 30;
const GAP = 10;
const PADDING = 20;

const CONTENT_HEIGHT =
  ITEM_COUNT * ITEM_SIZE + (ITEM_COUNT - 1) * GAP + PADDING;

const ThemePicker = () => {
  const toggleTheme = useToggleTheme();
  const colors = useColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const progress = useSharedValue(0);
  const selected = useSharedValue(0);

  const toggle = () => {
    const next = progress.value === 0 ? 1 : 0;

    progress.value = withTiming(next, {
      duration: 280,
    });
  };

  // 🔥 container morph (same as before)
  const containerAnim = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [50, 50 + CONTENT_HEIGHT]),
      borderRadius: interpolate(progress.value, [0, 1], [999, 30]),
    };
  });

  const iconAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`,
        },
      ],
    };
  });

  // 🔥 iOS-style stagger animation per item
  const STAGGER = 0.12; // normalized delay (0–1 range)
  const ITEM_REVEAL = 0.5; // length of each item's 0→1 window on the progress axis

  const createItemStyle = (index: number) =>
    useAnimatedStyle(() => {
      const start = index * STAGGER;
      // progress only runs 0→1; cap end so the last items still reach t=1 at progress=1
      const end = Math.min(start + ITEM_REVEAL, 1);

      const t = interpolate(progress.value, [start, end], [0, 1], "clamp");

      return {
        opacity: t,

        transform: [
          {
            translateY: interpolate(t, [0, 1], [12, 0]),
          },
          {
            scale: interpolate(t, [0, 1], [0.85, 1]),
          },
        ],
      };
    });

  const ThemeCircle = ({
    index,
    paletteName,
  }: {
    index: number;
    paletteName: PaletteName;
  }) => {
    const palette = palettes[paletteName];
    const anim = createItemStyle(index);

    const onPress = (e: GestureResponderEvent, paletteName: PaletteName) => {
      selected.value = index;
      console.log("selected", index);
      toggleTheme({
        themeValue: paletteName,
        animationType: AnimationType.Circular,
        touchX: 50,
        touchY: 50,
      });
    };

    return (
      <Pressable onPress={(e) => onPress(e, paletteName)}>
        <Animated.View
          style={[
            styles.circle,
            anim,
            selected.value === index && styles.activeCircle,
            { backgroundColor: palette.dark10, borderColor: palette.dark2 },
          ]}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, containerAnim]}>
        {/* HEADER */}
        <Pressable style={styles.header} onPress={toggle}>
          <Animated.View style={iconAnim}>
            <Ionicons
              name="color-palette-outline"
              size={28}
              color={colors.text.primary}
            />
          </Animated.View>
        </Pressable>

        {/* CONTENT */}
        <Animated.View style={styles.content}>
          {PALETTE_NAMES.map((paletteName, i) => (
            <ThemeCircle
              key={paletteName}
              index={i}
              paletteName={paletteName}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ThemePicker;
