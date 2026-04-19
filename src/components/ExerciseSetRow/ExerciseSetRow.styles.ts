import { StyleSheet } from "react-native";
import { scale } from "../../utils/scale";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statContainter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: scale(12),
  },
  input: {
    fontSize: scale(15),
    textAlign: "center",
    color: colors.text.primary,
    includeFontPadding: false,
    paddingVertical: 0,
    paddingBottom: scale(3),
  },
  deleteCol: {
    flex: 0.5,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: scale(12),
  },

  underline: {
    height: scale(1),
    width: "40%", // 👈 now THIS controls underline length safely
    backgroundColor: colors.text.primary,
  },

  underlineActive: {
    opacity: 1,
  },

  underlineInactive: {
    opacity: 0,
  },
});
