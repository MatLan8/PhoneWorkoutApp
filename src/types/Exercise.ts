export type Exercise = {
  id: number;
  workout_day_id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  position: number;
};

export type CreateExerciseInput = {
  workout_day_id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  position: number;
};

export type UpdateExerciseInput = {
  id: number;
  name?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  position?: number;
};
