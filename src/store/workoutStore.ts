import { create } from "zustand";
import { debounceSave } from "./debounce";

type SetType = {
  sets: number;
  weight: number;
  reps: number;
};

type Exercise = {
  id: number;
  name: string;
  sets: SetType[];
};

type Workout = {
  id: number;
  startTime: number;
  exercises: Exercise[];
};

type Store = {
  activeWorkout: Workout | null;

  startWorkout: (workout: Workout) => void;
  updateSet: (
    exerciseId: number,
    setIndex: number,
    data: Partial<SetType>,
  ) => void;
  finishWorkout: () => void;
};

export const useWorkoutStore = create<Store>((set, get) => ({
  activeWorkout: null,

  startWorkout: (workout) => {
    set({ activeWorkout: workout });
  },

  updateSet: (exerciseId, setIndex, data) => {
    set((state) => {
      if (!state.activeWorkout) return state;

      const updated = { ...state.activeWorkout };

      updated.exercises = updated.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;

        const newSets = [...ex.sets];
        newSets[setIndex] = {
          ...newSets[setIndex],
          ...data,
        };

        return { ...ex, sets: newSets };
      });

      debounceSave(() => {
        // saveActiveWorkoutToDB(updated);
      });

      return { activeWorkout: updated };
    });

    // 👉 we’ll plug debounce save here later
  },

  finishWorkout: () => {
    const workout = get().activeWorkout;

    // save to DB (later)
    // clear state
    set({ activeWorkout: null });
  },
}));
