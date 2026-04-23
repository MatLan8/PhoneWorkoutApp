import { StyleSheet } from "react-native";
import type { Theme } from "../../themes/createTheme";
import { scale } from "../../utils/scale";
import type { EdgeInsets } from "react-native-safe-area-context";

//export const createStyles = (colors: Theme, insets: EdgeInsets) =>
export const createStyles = (colors: Theme) =>
  StyleSheet.create({
    list: {
      paddingTop: 20,
      paddingHorizontal: 20,
      //paddingBottom: insets.bottom,
      paddingBottom: 40,
      gap: 15,
      justifyContent: "center",
      backgroundColor: colors.bg.primary,
    },
    itemWrap: {
      position: "relative",
      width: "100%",
    },
    itemShadow: {
      position: "absolute",
      zIndex: 0,
      top: 3,
      left: 0,
      right: 0,
      bottom: -6,
      borderRadius: 10,
    },
    item: {
      position: "relative",
      zIndex: 1,
      borderWidth: 1,
      width: "100%",
      height: "auto",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 10,
    },
    paletteLabel: {
      fontSize: scale(15),
      fontWeight: "600",
      textAlign: "left",
      width: "100%",
    },
  });
