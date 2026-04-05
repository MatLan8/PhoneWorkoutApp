import { Pressable, Text, View } from "react-native";
import React from "react";
import { styles } from "./WorkoutDayCard.styles";

type props = {
  dayName: string;
  color: string;
  onPress?: () => void;
};

const WorkoutDayCard = ({ dayName, color, onPress }: props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={styles.text}>{dayName}</Text>
      </View>
    </Pressable>
  );
};

export default WorkoutDayCard;
