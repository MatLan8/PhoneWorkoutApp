import { StyleSheet } from "react-native";
import { Theme } from "../../themes/createTheme";

export const createStyles = (colors: Theme) =>
  StyleSheet.create({
    wrapper: {
      position: "absolute",
      top: 40,
      left: 30,
      zIndex: 999,
    },
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: colors.bg.tertiary,
      alignSelf: "flex-start",
      overflow: "hidden", // 🔥 this is what makes it feel like ONE shape
      paddingHorizontal: 10,
    },

    header: {
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },

    content: {
      paddingVertical: 10,
      gap: 10,
      alignItems: "center",
    },

    circle: {
      width: 30,
      height: 30,
      borderRadius: 999,
      backgroundColor: colors.bg.tertiary,
      borderWidth: 2,
    },

    activeCircle: {
      borderWidth: 2,
      borderColor: "white",
    },
  });
