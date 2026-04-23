import { StyleSheet } from "react-native";
import { Theme } from "../../themes/createTheme";
import { scale } from "../../utils/scale";

export const createStyles = (colors: Theme) =>
  StyleSheet.create({
    list: {
      paddingHorizontal: 20,
      paddingBottom: 32,
    },
    item: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#3a3a3c",
    },
    name: {
      fontSize: 15,
      color: "#fff",
    },
    email: {
      fontSize: 13,
      color: "#666",
      marginTop: 2,
    },
  });
