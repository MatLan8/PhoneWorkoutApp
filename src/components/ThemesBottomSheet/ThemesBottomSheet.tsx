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
import { createStyles } from "./ThemesBottomSheet.styles";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BottomSheetListMethods {
  open: () => void;
  close: () => void;
}

export interface BottomSheetListProps {
  snapPoints?: readonly [...SnapPoint[]];
  onClose?: () => void;
}

// ─── Data & rendering (customise here) ───────────────────────────────────────

type Contact = { id: string; name: string; email: string };

const CONTACTS: Contact[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "2", name: "Bob Smith", email: "bob@example.com" },
  { id: "3", name: "Carol White", email: "carol@example.com" },
  { id: "4", name: "Alice Johnson", email: "alice@example.com" },
  { id: "5", name: "Bob Smith", email: "bob@example.com" },
  { id: "6", name: "Carol White", email: "carol@example.com" },
  { id: "7", name: "Alice Johnson", email: "alice@example.com" },
  { id: "8", name: "Bob Smith", email: "bob@example.com" },
  { id: "9", name: "Carol White", email: "carol@example.com" },
  { id: "10", name: "Alice Johnson", email: "alice@example.com" },
  { id: "11", name: "Bob Smith", email: "bob@example.com" },
  { id: "12", name: "Carol White", email: "carol@example.com" },
  { id: "13", name: "Alice Johnson", email: "alice@example.com" },
  { id: "14", name: "Bob Smith", email: "bob@example.com" },
  { id: "15", name: "Carol White", email: "carol@example.com" },
  { id: "16", name: "Alice Johnson", email: "alice@example.com" },
  { id: "17", name: "Bob Smith", email: "bob@example.com" },
  { id: "18", name: "Carol White", email: "carol@example.com" },
  { id: "19", name: "Alice Johnson", email: "alice@example.com" },
  { id: "20", name: "Bob Smith", email: "bob@example.com" },
  { id: "21", name: "Carol White", email: "carol@example.com" },
];

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

  const colors = useColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
      <Pressable onPress={() => console.log(item.name)}>
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </Pressable>
    ),
    [styles],
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
        data={CONTACTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
});

// ─── Styles ──────────────────────────────────────────────────────────────────
