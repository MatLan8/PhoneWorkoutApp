import { StyleSheet } from "react-native";
import { scale } from "../../utils/scale";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    borderRadius: scale(18),
    marginBottom: scale(16),
    marginHorizontal: scale(4),
    width: "90%",
    backgroundColor: colors.bg.secondary,
    flexDirection: "column",
    color: colors.text.primary,
  },
  name: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: colors.text.primary,
  },
  breakLine: {
    height: scale(2),
    backgroundColor: colors.text.primary,
    marginVertical: scale(8),
  },
});
