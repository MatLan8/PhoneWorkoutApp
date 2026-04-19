export type ExerciseWithSets = {
  id: number;
  name: string;
  notes: string | null;
  position: number;
  sets: {
    id: number;
    weight: number;
    reps: number;
    sets: number;
    position: number;
  }[];
};
