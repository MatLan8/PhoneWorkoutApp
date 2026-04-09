import React from "react";
import { View, StyleSheet, ImageBackground, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

interface LiquidGlassProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  intensity?: number; // blur strength
  tint?: "light" | "dark" | "default";
  backgroundColor?: string; // semi-transparent base overlay
  noiseImage?: any; // optional noise texture
  radialEdgeOpacity?: number; // max opacity at center
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  style,
  intensity = 80,
  tint = "dark",
  backgroundColor = "rgba(0, 0, 0, 0.41)", // slightly dark base
  noiseImage = require("../../assets/noise.png"),
  radialEdgeOpacity = 0.25, // max opacity in center
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Blur */}
      <BlurView
        intensity={intensity}
        tint={tint}
        style={StyleSheet.absoluteFill}
      />

      {/* Base background color */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor }]} />

      {/* Noise overlay */}
      {noiseImage && (
        <ImageBackground
          source={noiseImage}
          style={StyleSheet.absoluteFill}
          resizeMode="stretch"
          imageStyle={{ opacity: 0.15 }}
        />
      )}

      {/* Radial gradient: dark center, transparent edges */}
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="radial"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <Stop
              offset="0%"
              stopColor="black"
              stopOpacity={radialEdgeOpacity}
            />
            <Stop offset="100%" stopColor="black" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#radial)" />
      </Svg>

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default LiquidGlass;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
});
