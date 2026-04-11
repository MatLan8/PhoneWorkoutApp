import React, { useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./BottomSheet.styles";
import LiquidGlassBackground from "../LiquidGlassBackground ";
import LiquidGlass from "../LiquidGlassBackground ";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  snapMultiplier?: number; // 0 → 1
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  title,
  snapMultiplier = 0.5,
}) => {
  const SNAP_POINT = SCREEN_HEIGHT * snapMultiplier;
  const HIDDEN_POSITION = SCREEN_HEIGHT - SNAP_POINT;

  const translateY = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(0);

  // track value safely
  useEffect(() => {
    const id = translateY.addListener(({ value }) => {
      translateYValue.current = value;
    });
    return () => translateY.removeListener(id);
  }, []);

  const animateSheet = (toValue: number) => {
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
      overshootClamping: true,
      stiffness: 300,
      damping: 30,
      mass: 0.5,
    }).start();
  };

  useEffect(() => {
    animateSheet(visible ? 0 : HIDDEN_POSITION);
  }, [visible, HIDDEN_POSITION]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        translateY.stopAnimation();
        translateY.setOffset(translateYValue.current);
        translateY.setValue(0);
      },

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        translateY.flattenOffset();

        const current = translateYValue.current;

        const shouldClose =
          gestureState.dy > 100 ||
          current > HIDDEN_POSITION * 0.5 ||
          gestureState.vy > 1.2;

        if (shouldClose) {
          animateSheet(HIDDEN_POSITION);
          setTimeout(onClose, 150);
        } else {
          animateSheet(0);
        }
      },
    }),
  ).current;

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={visible ? "auto" : "none"}
    >
      {/* Overlay */}
      <TouchableWithoutFeedback
        onPress={() => {
          translateY.stopAnimation(() => {
            animateSheet(HIDDEN_POSITION);
            setTimeout(onClose, 150);
          });
        }}
      >
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: translateY.interpolate({
                inputRange: [0, HIDDEN_POSITION],
                outputRange: [0.5, 0],
                extrapolate: "clamp",
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sheet,
          {
            top: SNAP_POINT,
            bottom: 0,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Header */}
        <LiquidGlass style={{ flex: 1, padding: 40 }}>
          <View style={styles.header}>
            <View style={styles.handle} />
            {title && <Text style={styles.title}>{title}</Text>}
          </View>
          {/* Content */}
          <View style={styles.content}>{children}</View>
        </LiquidGlass>
      </Animated.View>
    </View>
  );
};

export default BottomSheet;
