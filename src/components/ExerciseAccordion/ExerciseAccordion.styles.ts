import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";
import { scale } from "../../utils/scale";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: scale(12),
    backgroundColor: colors.bg.secondary,
    color: colors.text.primary,
    width: "90%",
    marginBottom: scale(30),
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(16),
  },
  triggerPressed: {
    opacity: 0.6,
  },
  expandedOuter: {
    overflow: "hidden",
  },
  ghost: {
    position: "absolute",
    opacity: 0,
    zIndex: -1,
  },
  chevron: {
    width: scale(10),
    height: scale(10),
    borderRightWidth: scale(2),
    borderBottomWidth: scale(2),
    borderColor: "#666",
    transform: [{ rotate: "45deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "225deg" }],
  },
  content: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    flexDirection: "column",
  },
  headerText: {
    color: colors.text.primary,
    fontSize: scale(18),
    fontWeight: "bold",
  },
  contentText: {
    color: colors.text.primary,
    fontSize: scale(16),
  },

  breakLine: {
    height: scale(2),
    backgroundColor: colors.text.primary,
    marginBottom: scale(20),
  },
});
