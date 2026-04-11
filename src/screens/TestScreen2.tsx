import { Text, View } from "react-native";
import React from "react";

import { Aurora } from "../reactitcx_Components/Aurora/Aurora";

import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const TestScreen2 = () => {
  return (
    <View style={{ flex: 1 }}>
      <Aurora height={SCREEN_HEIGHT} />
    </View>
  );
};

export default TestScreen2;
