import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextStyle } from "react-native";
import Animated, { withSpring, withTiming } from "react-native-reanimated";
import type { AnimationConfig, TimeElapsed, CountupTimerProps } from "./types";
import { SIZE_PRESETS, DEFAULT_ANIMATION_CONFIG } from "./conf";

// ─── AnimatedDigit ────────────────────────────────────────────────────────────

const AnimatedDigit: React.FC<{
  char: string;
  style?: TextStyle;
  animationConfig: AnimationConfig;
}> = ({ char, style, animationConfig }) => {
  const entering = () => {
    "worklet";
    return {
      initialValues: {
        opacity: 0,
        transform: [{ translateY: 40 }, { scale: 0.8 }],
      },
      animations: {
        opacity: withTiming(1, {
          duration: animationConfig.characterEnterDuration,
        }),
        transform: [
          { translateY: withSpring(0, animationConfig.spring) },
          { scale: withSpring(1, animationConfig.spring) },
        ],
      },
    };
  };

  const exiting = () => {
    "worklet";
    return {
      initialValues: {
        opacity: 1,
        transform: [{ translateY: 0 }, { scale: 1 }],
      },
      animations: {
        opacity: withTiming(0, {
          duration: animationConfig.characterExitDuration,
        }),
        transform: [
          {
            translateY: withTiming(-30, {
              duration: animationConfig.characterExitDuration,
            }),
          },
          {
            scale: withTiming(0.9, {
              duration: animationConfig.characterExitDuration,
            }),
          },
        ],
      },
    };
  };

  return (
    <Animated.Text
      entering={entering}
      exiting={exiting}
      style={[style, styles.absoluteDigit]}
    >
      {char}
    </Animated.Text>
  );
};

// ─── DigitSlot ────────────────────────────────────────────────────────────────

const DigitSlot: React.FC<{
  char: string;
  style?: TextStyle;
  animationConfig: AnimationConfig;
}> = ({ char, style, animationConfig }) => (
  <View style={styles.digitSlot}>
    <Text style={[style, { opacity: 0 }]}>{char}</Text>
    <AnimatedDigit
      key={char}
      char={char}
      style={style}
      animationConfig={animationConfig}
    />
  </View>
);

// ─── DigitPair ────────────────────────────────────────────────────────────────

const DigitPair: React.FC<{
  value: number;
  style?: TextStyle;
  animationConfig: AnimationConfig;
}> = ({ value, style, animationConfig }) => {
  const padded = value.toString().padStart(2, "0");
  return (
    <View style={styles.digitPairRow}>
      <DigitSlot
        char={padded[0]}
        style={style}
        animationConfig={animationConfig}
      />
      <DigitSlot
        char={padded[1]}
        style={style}
        animationConfig={animationConfig}
      />
    </View>
  );
};

// ─── Separator ────────────────────────────────────────────────────────────────

const Separator: React.FC<{
  show: boolean;
  numberSize: number;
  separatorColor: string;
  separatorMargin: number;
}> = ({ show, numberSize, separatorColor, separatorMargin }) => {
  if (!show) return null;
  return (
    <Text
      style={[
        styles.separator,
        {
          fontSize: numberSize,
          color: separatorColor,
          marginHorizontal: separatorMargin,
        },
      ]}
    >
      :
    </Text>
  );
};

// ─── Unit ─────────────────────────────────────────────────────────────────────

const Unit: React.FC<{
  value: number;
  label: string;
  numberStyle: TextStyle;
  labelSize: number;
  labelColor: string;
  showLabels: boolean;
  animationConfig: AnimationConfig;
}> = ({
  value,
  label,
  numberStyle,
  labelSize,
  labelColor,
  showLabels,
  animationConfig,
}) => (
  <View style={styles.unitContainer}>
    <DigitPair
      value={value}
      style={numberStyle}
      animationConfig={animationConfig}
    />
    {showLabels && (
      <Text
        style={[styles.labelText, { fontSize: labelSize, color: labelColor }]}
      >
        {label}
      </Text>
    )}
  </View>
);

// ─── CountupTimer ─────────────────────────────────────────────────────────────

export const CountupTimer: React.FC<CountupTimerProps> = ({
  isRunning,
  initialSeconds = 0,
  size = "medium",
  customization = {},
}) => {
  const secondsToTimeElapsed = (total: number): TimeElapsed => ({
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  });

  const elapsedRef = useRef<number>(initialSeconds);
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>(
    secondsToTimeElapsed(initialSeconds),
  );

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      elapsedRef.current += 1;
      setTimeElapsed(secondsToTimeElapsed(elapsedRef.current));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const preset = SIZE_PRESETS[size];

  const styling = {
    numberSize: customization.numberSize ?? preset.numberSize,
    labelSize: customization.labelSize ?? preset.labelSize,
    numberColor: customization.numberColor ?? "#ffffff",
    labelColor: customization.labelColor ?? "#666666",
    separatorColor: customization.separatorColor ?? "#ffffff",
    gap: customization.gap ?? preset.gap,
    letterSpacing: customization.letterSpacing ?? 2,
    fontWeight: customization.fontWeight ?? "700",
    separatorMargin: preset.separatorMargin,
    showLabels: customization.showLabels ?? true,
    showSeparators: customization.showSeparators ?? true,
  } as const;

  const showHours = timeElapsed.hours > 0;

  const numberStyle: TextStyle = {
    fontSize: styling.numberSize,
    fontWeight: styling.fontWeight,
    color: styling.numberColor,
    letterSpacing: styling.letterSpacing,
  };

  return (
    <View style={[styles.countupWrapper, { gap: styling.gap }]}>
      {showHours && (
        <>
          <Unit
            value={timeElapsed.hours}
            label="HRS"
            numberStyle={numberStyle}
            labelSize={styling.labelSize}
            labelColor={styling.labelColor}
            showLabels={styling.showLabels}
            animationConfig={DEFAULT_ANIMATION_CONFIG}
          />
          <Separator
            show={styling.showSeparators}
            numberSize={styling.numberSize}
            separatorColor={styling.separatorColor}
            separatorMargin={styling.separatorMargin}
          />
        </>
      )}

      <Unit
        value={timeElapsed.minutes}
        label="MINS"
        numberStyle={numberStyle}
        labelSize={styling.labelSize}
        labelColor={styling.labelColor}
        showLabels={styling.showLabels}
        animationConfig={DEFAULT_ANIMATION_CONFIG}
      />
      <Separator
        show={styling.showSeparators}
        numberSize={styling.numberSize}
        separatorColor={styling.separatorColor}
        separatorMargin={styling.separatorMargin}
      />
      <Unit
        value={timeElapsed.seconds}
        label="SECS"
        numberStyle={numberStyle}
        labelSize={styling.labelSize}
        labelColor={styling.labelColor}
        showLabels={styling.showLabels}
        animationConfig={DEFAULT_ANIMATION_CONFIG}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  countupWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  unitContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  digitPairRow: {
    flexDirection: "row",
  },
  digitSlot: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteDigit: {
    position: "absolute",
  },
  labelText: {
    fontWeight: "600",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  separator: {
    fontWeight: "700",
  },
});
