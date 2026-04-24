import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { createStyles } from "./ExerciseSetRow.styles";
import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { useColors } from "../../themes/colors";

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
  const [focusedField, setFocusedField] = useState<
    "weight" | "reps" | "sets" | null
  >(null);

  const colors = useColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      {/* WEIGHT */}
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={String(set.weight)}
          onChangeText={(v) => onChange(exerciseId, set.id, "weight", v)}
          keyboardType="numeric"
          onFocus={() => setFocusedField("weight")}
          onBlur={() => setFocusedField(null)}
        />
        <View
          style={[
            styles.underline,
            focusedField === "weight"
              ? styles.underlineActive
              : styles.underlineInactive,
          ]}
        />
      </View>

      {/* REPS */}
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={String(set.reps)}
          onChangeText={(v) => onChange(exerciseId, set.id, "reps", v)}
          keyboardType="numeric"
          onFocus={() => setFocusedField("reps")}
          onBlur={() => setFocusedField(null)}
        />
        <View
          style={[
            styles.underline,
            focusedField === "reps"
              ? styles.underlineActive
              : styles.underlineInactive,
          ]}
        />
      </View>

      {/* SETS */}
      <View style={styles.statContainter}>
        <TextInput
          style={styles.input}
          value={String(set.sets)}
          onChangeText={(v) => onChange(exerciseId, set.id, "sets", v)}
          keyboardType="numeric"
          onFocus={() => setFocusedField("sets")}
          onBlur={() => setFocusedField(null)}
        />
        <View
          style={[
            styles.underline,
            focusedField === "sets"
              ? styles.underlineActive
              : styles.underlineInactive,
          ]}
        />
      </View>

      {/* DELETE */}
      <View style={styles.deleteCol}>
        <Pressable>
          <Feather name="x-circle" size={20} color={colors.text.primary} />
        </Pressable>
      </View>
    </View>
  );
};

export default ExerciseSetRow;
