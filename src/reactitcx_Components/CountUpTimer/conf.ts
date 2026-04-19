import { Easing } from "react-native-reanimated";
import type { AnimationConfig, CountdownSize } from "./types";

const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  characterEnterDuration: 400,
  characterExitDuration: 300,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  },
  timing: {
    duration: 500,
    easing: Easing.bezier(0.45, 0.5, 0.45, 1),
  },
};

type SizePreset = {
  numberSize: number;
  labelSize: number;
  gap: number;
  separatorMargin: number;
};

const SIZE_PRESETS: Record<CountdownSize, SizePreset> = {
  small: {
    numberSize: 24,
    labelSize: 10,
    gap: 6,
    separatorMargin: 3,
  },
  medium: {
    numberSize: 40,
    labelSize: 10,
    gap: 12,
    separatorMargin: 6,
  },
  large: {
    numberSize: 56,
    labelSize: 12,
    gap: 16,
    separatorMargin: 8,
  },
  xlarge: {
    numberSize: 72,
    labelSize: 14,
    gap: 20,
    separatorMargin: 8,
  },
};

export { DEFAULT_ANIMATION_CONFIG, SIZE_PRESETS };
