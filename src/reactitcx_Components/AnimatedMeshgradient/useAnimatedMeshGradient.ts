// hooks/useAnimatedMeshGradient.ts
import { useMemo } from "react";
import { Skia, vec } from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  useFrameCallback,
} from "react-native-reanimated";

import { SHADER as MESH_GRADIENT_SHADER } from "./conf";
import { DEFAULT_INITIAL_COLORS } from "./const";
import type { IMeshGradientColor } from "./types";

interface UseAnimatedMeshGradientProps {
  width: number;
  height: number;
  colors?: IMeshGradientColor[];
  speed?: number;
  noise?: number;
  blur?: number;
  contrast?: number;
  animated?: boolean;
}

export function useAnimatedMeshGradient({
  width,
  height,
  colors = DEFAULT_INITIAL_COLORS,
  speed = 1,
  noise = 0.15,
  blur = 0.4,
  contrast = 1,
  animated = true,
}: UseAnimatedMeshGradientProps) {
  // ─── Time animation ───────────────────────────────────────────────
  const time = useSharedValue(0);

  useFrameCallback((frameInfo) => {
    if (animated && frameInfo.timeSincePreviousFrame != null) {
      time.value += (frameInfo.timeSincePreviousFrame / 1000) * speed;
    }
  }, animated);

  // ─── Ensure 4 colors ──────────────────────────────────────────────
  const safeColors = useMemo<IMeshGradientColor[]>(() => {
    const result = [...colors];
    while (result.length < 4) {
      result.push(
        DEFAULT_INITIAL_COLORS[result.length % DEFAULT_INITIAL_COLORS.length],
      );
    }
    return result.slice(0, 4);
  }, [colors]);

  // ─── Shader (compiled once) ───────────────────────────────────────
  const shader = useMemo(() => {
    return Skia.RuntimeEffect.Make(MESH_GRADIENT_SHADER);
  }, []);

  // ─── Animated uniforms ────────────────────────────────────────────
  const uniforms = useDerivedValue(() => ({
    resolution: vec(width, height),
    time: time.value,
    noise: Math.max(0, Math.min(1, noise)),
    blur: Math.max(0, Math.min(1, blur)),
    contrast: Math.max(0, Math.min(2, contrast)),
    color1: [safeColors[0].r, safeColors[0].g, safeColors[0].b, 1],
    color2: [safeColors[1].r, safeColors[1].g, safeColors[1].b, 1],
    color3: [safeColors[2].r, safeColors[2].g, safeColors[2].b, 1],
    color4: [safeColors[3].r, safeColors[3].g, safeColors[3].b, 1],
  }));

  return { shader, uniforms };
}
