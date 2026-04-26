import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { PaletteName } from "../../themes/palettes";

export enum AnimationType {
  Circular = "circular",
  Wipe = "wipe",
  CircularInverted = "circularInverted",
  WipeRight = "wipeRight",
  WipeDown = "wipeDown",
  WipeUp = "wipeUp",
}

export enum EasingType {
  Linear = "linear",
  Ease = "ease",
  EaseIn = "easeIn",
  EaseOut = "easeOut",
  EaseInOut = "easeInOut",
}

export interface ThemeSwitcherRef {
  animate: (touchX?: number, touchY?: number) => Promise<void>;
}

// onThemeChange is () => void — the switcher fires it mid-animation,
// the AnimatedThemeProvider decides what actually changes.
export interface ThemeSwitcherProps {
  onThemeChange: () => void;
  children: ReactNode;
  animationDuration?: number;
  readonly animationType?: AnimationType;
  readonly style?: StyleProp<ViewStyle>;
  readonly onAnimationStart?: () => void;
  readonly onAnimationComplete?: () => void;
  readonly switchDelay?: number;
  readonly easing?: EasingType;
}

/** Options for animated palette switch. Only `themeValue` is required. */
export interface IThemeOptions {
  themeValue: PaletteName;
  touchX?: number;
  touchY?: number;
  animationType?: AnimationType;
  animationDuration?: number;
  easing?: EasingType;
}

export interface IThemeAnimation {
  type: AnimationType;
  duration: number;
  easing: EasingType;
}

export interface AnimatedThemeProviderProps {
  children: ReactNode;
  readonly defaultPalette?: PaletteName;
  readonly onAnimationStart?: () => void;
  readonly onAnimationComplete?: () => void;
}
