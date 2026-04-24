import { Text, View, Pressable } from "react-native";
import React from "react";
import { useThemeSheet } from "../themeSheet/ThemeSheetHost";
import ThemePicker from "../components/ThemePicker/ThemePicker";

const TestScreen = () => {
  const { open } = useThemeSheet();

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <ThemePicker />
      <Text>TestScreen</Text>
      <Pressable
        style={[
          {
            backgroundColor: "red",
            marginTop: 100,
            width: 100,
            height: 100,
          },
        ]}
      >
        <Text>Open Sheet</Text>
      </Pressable>
    </View>
  );
};

export default TestScreen;
