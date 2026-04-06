import { StyleSheet } from "react-native";
import { scale } from "../../utils/scale";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statContainter: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: scale(15),
    textAlign: "center",
    paddingVertical: scale(10),
    paddingHorizontal: scale(24),
  },
  label: {
    fontSize: scale(13),
    fontWeight: "bold",
    color: "black",
    marginLeft: scale(4),
  },
  statSeperator: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginHorizontal: scale(8),
    alignSelf: "center",
  },
});
