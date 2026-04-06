export type Exercise = {
  id: number;
  workout_day_id: number;
  name: string;
  notes?: string;
  position: number;
};

export type UpdateExerciseInput = {
  id: number;
  name?: string;
  notes?: string;
  position?: number;
};

export type CreateExerciseInput = {
  workout_day_id: number;
  name: string;
  notes?: string;
  position: number;
};

export type ExerciseSet = {
  id: number;
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
  position: number;
};

export type CreateExerciseSetInput = {
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
  position: number;
};

export type UpdateExerciseSetInput = {
  id: number;
  weight?: number;
  reps?: number;
  sets?: number;
  position?: number;
};
