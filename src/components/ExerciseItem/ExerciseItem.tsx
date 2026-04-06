import { Text, View } from "react-native";
import { styles } from "./ExerciseItem.styles";
import React, { useState, useEffect } from "react";
import { Exercise, ExerciseSet } from "../../types/Exercise";
import { getExerciseSetsByExerciseId } from "../../db/exercise.repository";
import ExerciseSetRow from "../ExerciseSetRow/ExerciseSetRow";

type SetRow = ExerciseSet & {
  weightInput: string;
  repsInput: string;
  setsInput: string;
};

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const [sets, setSets] = useState<SetRow[]>([]);

  useEffect(() => {
    const data = getExerciseSetsByExerciseId(exercise.id);
    setSets(
      data.map((s) => ({
        ...s,
        weightInput: s.weight.toString(),
        repsInput: s.reps.toString(),
        setsInput: s.sets.toString(),
      })),
    );
  }, [exercise.id]);

  const handleChange = (
    id: number,
    field: keyof Pick<ExerciseSet, "weight" | "reps" | "sets">,
    value: string,
  ) => {
    const numeric = value.replace(/[^0-9.]/g, "");
    setSets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [`${field}Input`]: numeric } : s)),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{exercise.name}</Text>
      <View style={styles.breakLine} />
      {sets.map((set) => (
        <ExerciseSetRow key={set.id} set={set} onChange={handleChange} />
      ))}
    </View>
  );
};

export default ExerciseItem;
