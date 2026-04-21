import { Easing } from "react-native-reanimated";
import { EasingType } from "./types";

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getEasingFunction = (easing: EasingType): ((value: number) => number) => {
  switch (easing) {
    case EasingType.Linear:    return Easing.linear;
    case EasingType.Ease:      return Easing.ease;
    case EasingType.EaseIn:    return Easing.in(Easing.ease);
    case EasingType.EaseOut:   return Easing.out(Easing.ease);
    case EasingType.EaseInOut:
    default:                   return Easing.inOut(Easing.ease);
  }
};

export const getMaxRadius = (
  x: number,
  y: number,
  screenWidth: number,
  screenHeight: number,
): number =>
  Math.max(
    ...([
      [0, 0],
      [screenWidth, 0],
      [0, screenHeight],
      [screenWidth, screenHeight],
    ] as [number, number][]).map(([cx, cy]) =>
      Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2)),
    ),
  );
