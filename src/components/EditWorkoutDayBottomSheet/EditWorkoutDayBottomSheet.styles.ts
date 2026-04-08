import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";
import { scale } from "../../utils/scale";

export const styles = StyleSheet.create({
  ColorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: scale(4), // add some padding inside the bubble
    borderRadius: scale(9999),
    marginVertical: scale(4),
    alignSelf: "center", // center bubble horizontally
    minWidth: "100%", // optional: min width for the row bubble
  },
  ColorOption: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(100),
    margin: scale(4),
  },
});
