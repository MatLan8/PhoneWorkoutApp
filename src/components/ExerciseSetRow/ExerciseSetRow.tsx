import React from "react";
import { View, TextInput, Text } from "react-native";
import { ExerciseSet } from "../../types/Exercise";
import { styles } from "./ExerciseSetRow.styles";

type SetRow = ExerciseSet & {
  weightInput: string;
  repsInput: string;
  setsInput: string;
};

type Props = {
  set: SetRow;
  onChange: (
    id: number,
    field: keyof Pick<ExerciseSet, "weight" | "reps" | "sets">,
    value: string,
  ) => void;
};

const ExerciseSetRow = ({ set, onChange }: Props) => {
  return (
    <View style={styles.row}>
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={set.weightInput}
          onChangeText={(v) => onChange(set.id, "weight", v)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>kg</Text>
      </View>

      <Text style={styles.statSeperator}>|</Text>
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={set.repsInput}
          onChangeText={(v) => onChange(set.id, "reps", v)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>reps</Text>
      </View>

      <Text style={styles.statSeperator}>|</Text>
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={set.setsInput}
          onChangeText={(v) => onChange(set.id, "sets", v)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>sets</Text>
      </View>
    </View>
  );
};

export default ExerciseSetRow;
