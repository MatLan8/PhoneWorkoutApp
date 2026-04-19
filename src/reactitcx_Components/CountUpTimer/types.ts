import type {
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated";

interface AnimationConfig {
  characterEnterDuration: number;
  characterExitDuration: number;
  spring: WithSpringConfig;
  timing: WithTimingConfig;
}

interface TimeElapsed {
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownSize = "small" | "medium" | "large" | "xlarge";

interface CountupCustomization {
  readonly numberSize?: number;
  readonly labelSize?: number;
  readonly numberColor?: string;
  readonly labelColor?: string;
  readonly separatorColor?: string;
  readonly gap?: number;
  readonly letterSpacing?: number;
  readonly fontWeight?: "400" | "500" | "600" | "700" | "800" | "900";
  readonly showLabels?: boolean;
  readonly showSeparators?: boolean;
  readonly fontFamily?: string;
}

interface CountupTimerProps {
  isRunning: boolean;
  readonly initialSeconds?: number;
  readonly size?: CountdownSize;
  readonly customization?: CountupCustomization;
}

export type {
  AnimationConfig,
  TimeElapsed,
  CountdownSize,
  CountupCustomization,
  CountupTimerProps,
};
