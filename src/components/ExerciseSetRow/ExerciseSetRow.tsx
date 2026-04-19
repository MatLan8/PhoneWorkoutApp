import React from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "./ExerciseSetRow.styles";

type Props = {
  set: {
    id: number;
    weight: number;
    reps: number;
    sets: number;
  };
  exerciseId: number;
  onChange: (
    exerciseId: number,
    setId: number,
    field: "weight" | "reps" | "sets",
    value: string,
  ) => void;
};

const ExerciseSetRow = ({ set, exerciseId, onChange }: Props) => {
  return (
    <View style={styles.row}>
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={String(set.weight)}
          onChangeText={(v) => onChange(exerciseId, set.id, "weight", v)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>kg</Text>
      </View>

      <Text style={styles.statSeperator}>|</Text>

      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={String(set.reps)}
          onChangeText={(v) => onChange(exerciseId, set.id, "reps", v)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>reps</Text>
      </View>

      <Text style={styles.statSeperator}>|</Text>

      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={String(set.sets)}
          onChangeText={(v) => onChange(exerciseId, set.id, "sets", v)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>sets</Text>
      </View>
    </View>
  );
};

export default ExerciseSetRow;
