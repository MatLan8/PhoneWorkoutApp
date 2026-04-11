import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import {
  Canvas,
  RoundedRect,
  BackdropFilter,
  Blur,
  Paint,
  ColorMatrix,
  rect,
  rrect,
} from "@shopify/react-native-skia";

interface GlassCardProps {
  width: number;
  height: number;
  borderRadius?: number;
  blurAmount?: number;
  tintOpacity?: number;
  tintColor?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export default function GlassCard({
  width,
  height,
  borderRadius = 24,
  blurAmount = 16,
  tintOpacity = 0.15,
  tintColor = "white",
  style,
  children,
}: GlassCardProps) {
  const clipRect = rrect(rect(0, 0, width, height), borderRadius, borderRadius);

  return (
    <View style={[style, { width, height }]}>
      {/* Skia canvas for the glass blur effect — positioned absolute behind children */}
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        <BackdropFilter filter={<Blur blur={blurAmount} />} clip={clipRect}>
          {/* Tint overlay inside the glass */}
          <RoundedRect
            x={0}
            y={0}
            width={width}
            height={height}
            r={borderRadius}
            color={tintColor}
            opacity={tintOpacity}
          />
        </BackdropFilter>

        {/* Subtle border highlight */}
        <RoundedRect
          x={1}
          y={1}
          width={width - 2}
          height={height - 2}
          r={borderRadius}
          color="transparent"
          style="stroke"
          strokeWidth={1.5}
        >
          <Paint color="rgba(255,255,255,0.35)" />
        </RoundedRect>
      </Canvas>

      {/* Your children render on top of the glass */}
      <View style={[styles.content, { borderRadius }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    overflow: "hidden",
    padding: 20,
  },
});
