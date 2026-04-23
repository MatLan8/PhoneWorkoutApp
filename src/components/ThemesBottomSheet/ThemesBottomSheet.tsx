import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BottomSheet from "../../reactitcx_Components/BottomSheet";
import type {
  BottomSheetMethods,
  SnapPoint,
} from "../../reactitcx_Components/BottomSheet/types";

import { useColors } from "../../themes/colors";
import { useTheme } from "../../themes/ThemeContext";
import { createStyles } from "./ThemesBottomSheet.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palettes, type PaletteName } from "../../themes/palettes";

import { useToggleTheme, AnimationType } from "../../components/ThemeSwitch";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BottomSheetListMethods {
  open: () => void;
  close: () => void;
}

export interface BottomSheetListProps {
  snapPoints?: readonly [...SnapPoint[]];
  onClose?: () => void;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PALETTE_NAMES = Object.keys(palettes) as PaletteName[];

// ─── Component ───────────────────────────────────────────────────────────────

export const ThemesBottomSheet = forwardRef<
  BottomSheetListMethods,
  BottomSheetListProps
>(({ snapPoints = ["70%"], onClose }, ref) => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.snapToIndex(0),
    close: () => sheetRef.current?.close(),
  }));
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { setPalette } = useTheme();
  //const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const toggleTheme = useToggleTheme();

  const renderItem = useCallback(
    ({ item: paletteName }: { item: PaletteName }) => {
      const palette = palettes[paletteName];
      return (
        <Pressable
          style={{ width: "100%" }}
          onPress={() =>
            toggleTheme({
              themeType: "palette",
              themeValue: paletteName,
              animationType: AnimationType.Wipe,
            })
          }
        >
          <View style={styles.itemWrap}>
            <View
              pointerEvents="none"
              style={[
                styles.itemShadow,
                {
                  backgroundColor: palette.dark11,
                  opacity: 1,
                },
              ]}
            />
            <View
              style={[
                styles.item,
                {
                  backgroundColor: palette.dark2,
                  borderColor: palette.dark9,
                },
              ]}
            >
              <Text style={[styles.paletteLabel, { color: palette.dark11 }]}>
                {paletteName}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [styles, setPalette],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      backgroundColor="white"
      borderRadius={28}
      backdropOpacity={0.6}
      onClose={onClose}
    >
      <FlatList
        data={PALETTE_NAMES}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
});

// ─── Styles ──────────────────────────────────────────────────────────────────
