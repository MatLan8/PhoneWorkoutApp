import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
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
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#666",
    transform: [{ rotate: "45deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "225deg" }],
  },
  content: {
    height: 300,
  },
});
