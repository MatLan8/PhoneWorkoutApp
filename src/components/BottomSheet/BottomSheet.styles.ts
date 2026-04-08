import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";
import { scale } from "../../utils/scale";

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.overlay,
  },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },

  header: {
    alignItems: "center",
    paddingVertical: scale(10),
  },

  handle: {
    width: scale(40),
    height: scale(5),
    borderRadius: scale(3),
    backgroundColor: "#666",
    marginBottom: scale(8),
  },

  title: {
    fontSize: scale(20),
    fontWeight: "600",
    color: "white",
  },

  content: {
    padding: scale(16),
  },
});
