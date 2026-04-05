import { Text, View, TextInput } from "react-native";
import { styles } from "./ExerciseItem.styles";
import React from "react";
import { useState, useEffect } from "react";
import { Exercise } from "../../types/Exercise";

import { Dimensions } from "react-native";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const [weight, setWeight] = useState(exercise.weight.toString());
  const [sets, setSets] = useState(exercise.sets.toString());
  const [reps, setReps] = useState(exercise.reps.toString());

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{exercise.name}</Text>
      <View style={styles.breakLine} />
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <TextInput
            style={styles.statsInputWeight}
            value={weight.toString()}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");
              setWeight(numeric);
            }}
            keyboardType="numeric"
          />
          <Text style={styles.text}>kgs</Text>
        </View>
        <Text style={styles.statSeperator}>X</Text>
        <View style={styles.statsItem}>
          <TextInput
            style={styles.statsInput}
            value={reps.toString()}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");
              setReps(numeric);
            }}
            keyboardType="numeric"
          />
          <Text style={styles.text}>reps</Text>
        </View>
        <Text style={styles.statSeperator}>X</Text>
        <View style={styles.statsItem}>
          <TextInput
            style={styles.statsInput}
            value={sets.toString()}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");
              setSets(numeric);
            }}
            keyboardType="numeric"
          />
          <Text style={styles.text}>sets</Text>
        </View>
      </View>
    </View>
  );
};

export default ExerciseItem;
