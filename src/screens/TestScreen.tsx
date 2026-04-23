import { Text, View, Pressable } from "react-native";
import React from "react";
import { useThemeSheet } from "../themeSheet/ThemeSheetHost";

const TestScreen = () => {
  const { open } = useThemeSheet();

  return (
    <View style={{ flex: 1 }}>
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
        onPress={() => open()}
      >
        <Text>Open Sheet</Text>
      </Pressable>
    </View>
  );
};

export default TestScreen;
