import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./StatsScreen.styles";

import ExerciseAccordion from "../../components/ExerciseAccordion/ExerciseAccordion";

const StatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>StatsScreen</Text>
    </SafeAreaView>
  );
};

export default StatsScreen;
