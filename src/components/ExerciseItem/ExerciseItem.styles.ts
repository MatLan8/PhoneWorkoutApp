import { StyleSheet } from "react-native";
import { scale } from "../../utils/scale";

export const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    borderRadius: scale(18),
    marginBottom: scale(16),
    marginHorizontal: scale(4),
    width: "90%",
    backgroundColor: "lightgray",
    flexDirection: "column",
  },

  name: {
    fontSize: scale(18),
    fontWeight: "bold",
  },

  text: {
    fontSize: scale(16), // slightly smaller for better fit
    marginLeft: scale(6),
    fontWeight: "600", // FIX: semibold → 600
  },

  stats: {
    flexDirection: "row",
    alignItems: "center", // FIX: was alignContent
  },

  breakLine: {
    height: scale(2),
    backgroundColor: "black",
    marginVertical: scale(8),
  },

  statsItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  statsInputWeight: {
    backgroundColor: "white",
    borderRadius: scale(8),
    paddingVertical: scale(4),
    paddingHorizontal: scale(6),
    fontSize: scale(16),
    width: scale(42),
    textAlign: "right",
  },

  statsInput: {
    backgroundColor: "white",
    borderRadius: scale(8),
    paddingVertical: scale(4),
    paddingHorizontal: scale(6),
    fontSize: scale(16),
    width: scale(36),
    textAlign: "right",
  },

  statSeperator: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginHorizontal: scale(8),
    alignSelf: "center",
  },
});
