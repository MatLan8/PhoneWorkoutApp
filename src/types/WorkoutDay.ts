export type WorkoutDay = {
  id: number;
  name: string;
  color: string;
  position: number;
};

export type CreateWorkoutDayInput = {
  name: string;
  color: string;
  position: number;
};
