import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CircleLoadingIndicator } from "../../reactitcx_Components/CircleLoader/circle-loader";

const StatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "white" }}>Stats Screen</Text>
      <CircleLoadingIndicator
        dotSpacing={8}
        dotColor="#fff"
        style={{
          marginTop: 60,
        }}
        duration={500}
      />
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
