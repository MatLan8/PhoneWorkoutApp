import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";
import { scale } from "../../utils/scale";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  exerciseContainer: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.text.primary,
    padding: 16,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: colors.bg.primary,
    fontSize: scale(20),
    fontWeight: "bold",
  },
});
