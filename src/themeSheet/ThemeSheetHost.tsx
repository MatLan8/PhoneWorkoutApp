import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { StyleSheet, View } from "react-native";
import {
  ThemesBottomSheet,
  type BottomSheetListMethods,
} from "../components/ThemesBottomSheet/ThemesBottomSheet";

type ThemeSheetContextValue = {
  open: () => void;
  close: () => void;
};

const ThemeSheetContext = createContext<ThemeSheetContextValue | null>(null);

export function ThemeSheetProvider({ children }: { children: ReactNode }) {
  const sheetRef = useRef<BottomSheetListMethods>(null);

  const value = useMemo(
    () => ({
      open: () => sheetRef.current?.open(),
      close: () => sheetRef.current?.close(),
    }),
    [],
  );

  return (
    <ThemeSheetContext.Provider value={value}>
      {children}
      <View style={styles.overlay} pointerEvents="box-none">
        <ThemesBottomSheet ref={sheetRef} />
      </View>
    </ThemeSheetContext.Provider>
  );
}

export function useThemeSheet() {
  const ctx = useContext(ThemeSheetContext);
  if (!ctx) {
    throw new Error("useThemeSheet must be used inside ThemeSheetProvider");
  }
  return ctx;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
});
