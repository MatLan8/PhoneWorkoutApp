import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Canvas,
  Circle,
  Group,
  Image,
  Mask,
  Rect,
  SkImage,
  makeImageFromView,
} from "@shopify/react-native-skia";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import {
  AnimationType,
  type ThemeSwitcherProps,
  type ThemeSwitcherRef,
} from "./types";
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_SWITCH_DELAY,
  DEFAULT_EASING,
} from "./conf";
import { wait, getEasingFunction, getMaxRadius } from "./helpers";

export const ThemeSwitcher = forwardRef<ThemeSwitcherRef, ThemeSwitcherProps>(
  (
    {
      onThemeChange,
      children,
      animationDuration = DEFAULT_ANIMATION_DURATION,
      animationType = DEFAULT_ANIMATION_TYPE,
      style,
      onAnimationStart,
      onAnimationComplete,
      switchDelay = DEFAULT_SWITCH_DELAY,
      easing = DEFAULT_EASING,
    },
    ref,
  ) => {
    const pd = PixelRatio.get();
    const viewRef = useRef<View>(null);
    const [overlay, setOverlay] = useState<SkImage | null>(null);
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
      Dimensions.get("screen");

    const circleRadius = useSharedValue(0);
    const circleCenterX = useSharedValue(SCREEN_WIDTH / 2);
    const circleCenterY = useSharedValue(SCREEN_HEIGHT / 2);
    const wipePosition = useSharedValue(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const animateThemeChange = async (
      touchX?: number,
      touchY?: number,
    ): Promise<void> => {
      if (isAnimating) return;
      setIsAnimating(true);
      onAnimationStart?.();

      const centerX = touchX ?? SCREEN_WIDTH / 2;
      const centerY = touchY ?? SCREEN_HEIGHT / 2;
      circleCenterX.value = centerX;
      circleCenterY.value = centerY;

      if (viewRef.current) {
        const snapshot = await makeImageFromView<View>(
          viewRef as React.RefObject<View>,
        );
        setOverlay(snapshot);
      }

      await wait(switchDelay);
      onThemeChange(); // AnimatedThemeProvider applies the queued change here

      const easingFn = getEasingFunction(easing);

      switch (animationType) {
        case AnimationType.Circular: {
          const r = getMaxRadius(centerX, centerY, SCREEN_WIDTH, SCREEN_HEIGHT);
          circleRadius.value = withTiming(r, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        }
        case AnimationType.CircularInverted: {
          const r = getMaxRadius(centerX, centerY, SCREEN_WIDTH, SCREEN_HEIGHT);
          circleRadius.value = r;
          circleRadius.value = withTiming(0, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        }
        case AnimationType.Wipe:
          wipePosition.value = withTiming(SCREEN_WIDTH, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        case AnimationType.WipeRight:
          wipePosition.value = SCREEN_WIDTH;
          wipePosition.value = withTiming(0, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        case AnimationType.WipeDown:
          wipePosition.value = withTiming(SCREEN_HEIGHT, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        case AnimationType.WipeUp:
          wipePosition.value = SCREEN_HEIGHT;
          wipePosition.value = withTiming(0, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        default:
          wipePosition.value = withTiming(SCREEN_WIDTH, {
            duration: animationDuration,
            easing: easingFn,
          });
      }

      await wait(animationDuration);
      setOverlay(null);
      setIsAnimating(false);
      onAnimationComplete?.();

      await wait(200);
      circleRadius.value = 0;
      wipePosition.value = 0;
    };

    useImperativeHandle(ref, () => ({ animate: animateThemeChange }));

    const renderMask = () => {
      switch (animationType) {
        case AnimationType.Circular:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Circle
                cx={circleCenterX}
                cy={circleCenterY}
                r={circleRadius}
                color="black"
              />
            </Group>
          );
        case AnimationType.CircularInverted:
          return (
            <Group>
              <Circle
                cx={circleCenterX}
                cy={circleCenterY}
                r={circleRadius}
                color="white"
              />
            </Group>
          );
        case AnimationType.Wipe:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect height={SCREEN_HEIGHT} width={wipePosition} color="black" />
            </Group>
          );
        case AnimationType.WipeRight:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect
                x={wipePosition}
                height={SCREEN_HEIGHT}
                width={SCREEN_WIDTH}
                color="black"
              />
            </Group>
          );
        case AnimationType.WipeDown:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect height={wipePosition} width={SCREEN_WIDTH} color="black" />
            </Group>
          );
        case AnimationType.WipeUp:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect
                y={wipePosition}
                height={SCREEN_HEIGHT}
                width={SCREEN_WIDTH}
                color="black"
              />
            </Group>
          );
        default:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect height={SCREEN_HEIGHT} width={wipePosition} color="black" />
            </Group>
          );
      }
    };

    return (
      <View style={[styles.container, style]} ref={viewRef} collapsable={false}>
        {children}
        {overlay && (
          <Canvas style={StyleSheet.absoluteFillObject} pointerEvents="none">
            <Mask mode="luminance" mask={renderMask()}>
              <Image
                image={overlay}
                x={0}
                y={0}
                width={overlay.width() / pd}
                height={overlay.height() / pd}
              />
            </Mask>
          </Canvas>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({ container: { flex: 1 } });
