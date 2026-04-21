import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ThemeProvider, useTheme } from "../../themes/ThemeContext";
import type { Mode } from "../../themes/createTheme";
import type { PaletteName } from "../../themes/palettes";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_EASING,
} from "./conf";
import type {
  AnimatedThemeProviderProps,
  IThemeAnimation,
  IThemeOptions,
  ThemeSwitcherRef,
} from "./types";

// ─── Animation context ────────────────────────────────────────────────────────
// Kept separate from ThemeContext so the themes folder stays independent.

type AnimationContextType = {
  toggleTheme: (options: IThemeOptions) => Promise<void>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useToggleTheme = (): ((options: IThemeOptions) => Promise<void>) => {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error("useToggleTheme must be used within AnimatedThemeProvider");
  return ctx.toggleTheme;
};

// ─── Inner provider ───────────────────────────────────────────────────────────
// Must render inside ThemeProvider so it can call useTheme().

const ThemeSwitcherProvider = memo(({
  children,
  onAnimationStart,
  onAnimationComplete,
}: {
  children: React.ReactNode;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}) => {
  const { setMode, setPalette } = useTheme();
  const switcherRef = useRef<ThemeSwitcherRef>(null);

  const [currentAnimation, setCurrentAnimation] = useState<IThemeAnimation>({
    type: DEFAULT_ANIMATION_TYPE,
    duration: DEFAULT_ANIMATION_DURATION,
    easing: DEFAULT_EASING,
  });

  // Queued change applied mid-animation so the new theme renders under the mask.
  // Ref instead of state: must be readable synchronously in the callback,
  // and must not cause an extra render when set.
  const pendingChangeRef = useRef<IThemeOptions | null>(null);

  const applyPendingChange = useCallback(() => {
    const pending = pendingChangeRef.current;
    if (!pending) return;
    if (pending.themeType === "mode") setMode(pending.themeValue as Mode);
    else setPalette(pending.themeValue as PaletteName);
    pendingChangeRef.current = null;
  }, [setMode, setPalette]);

  const toggleTheme = useCallback(
    async (options: IThemeOptions): Promise<void> => {
      if (options.animationType || options.animationDuration || options.easing) {
        setCurrentAnimation({
          type: options.animationType ?? currentAnimation.type,
          duration: options.animationDuration ?? currentAnimation.duration,
          easing: options.easing ?? currentAnimation.easing,
        });
      }

      pendingChangeRef.current = options;

      // Let animation config state flush before triggering the switcher
      await new Promise((resolve) => setTimeout(resolve, 0));
      await switcherRef.current?.animate(options.touchX, options.touchY);
    },
    [currentAnimation],
  );

  return (
    <AnimationContext.Provider value={{ toggleTheme }}>
      <ThemeSwitcher
        ref={switcherRef}
        onThemeChange={applyPendingChange}
        animationType={currentAnimation.type}
        animationDuration={currentAnimation.duration}
        easing={currentAnimation.easing}
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </ThemeSwitcher>
    </AnimationContext.Provider>
  );
});

// ─── Public export ────────────────────────────────────────────────────────────
// Single provider for App.tsx — replaces both the old ThemeProvider
// and the old reacticx ThemeProvider.

export const AnimatedThemeProvider = memo(({
  children,
  defaultMode = "dark",
  defaultPalette = "neutral",
  onAnimationStart,
  onAnimationComplete,
}: AnimatedThemeProviderProps) => (
  <ThemeProvider defaultMode={defaultMode} defaultPalette={defaultPalette}>
    <ThemeSwitcherProvider
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </ThemeSwitcherProvider>
  </ThemeProvider>
));
