import * as SQLite from "expo-sqlite";
import {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
} from "../types/Exercise";
import { WorkoutDay } from "../types/WorkoutDay";

const db = SQLite.openDatabaseSync("workout.db");

export function createExercise(input: CreateExerciseInput) {
  const statement = db.prepareSync(`
    INSERT INTO exercises (
      workout_day_id,
      name,
      sets,
      reps,
      weight,
      position
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  try {
    const result = statement.executeSync([
      input.workout_day_id,
      input.name,
      input.sets,
      input.reps,
      input.weight,
      input.position,
    ]);

    const inserted = db.getFirstSync<Exercise>(
      `
      SELECT *
      FROM exercises
      WHERE id = last_insert_rowid()
      `,
    );
    return inserted;
  } finally {
    statement.finalizeSync();
  }
}

export function updateExercise(input: UpdateExerciseInput): Exercise | null {
  const updates: string[] = [];
  const values: any[] = [];

  if (input.name !== undefined) {
    updates.push("name = ?");
    values.push(input.name);
  }

  if (input.sets !== undefined) {
    updates.push("sets = ?");
    values.push(input.sets);
  }

  if (input.reps !== undefined) {
    updates.push("reps = ?");
    values.push(input.reps);
  }

  if (input.weight !== undefined) {
    updates.push("weight = ?");
    values.push(input.weight);
  }

  if (input.position !== undefined) {
    updates.push("position = ?");
    values.push(input.position);
  }

  // nothing to update
  if (updates.length === 0) return null;

  const query = `
    UPDATE exercises
    SET ${updates.join(", ")}
    WHERE id = ?
  `;

  values.push(input.id);

  const statement = db.prepareSync(query);

  try {
    statement.executeSync(values);

    return db.getFirstSync<Exercise>(`SELECT * FROM exercises WHERE id = ?`, [
      input.id,
    ]);
  } finally {
    statement.finalizeSync();
  }
}

export function getExercisesByWorkoutDayId(workoutDayId: number): Exercise[] {
  const statement = db.prepareSync(`
    SELECT id, workout_day_id, name, sets, reps, weight, position
    FROM exercises
    WHERE workout_day_id = ?
    ORDER BY position ASC
  `);

  try {
    return statement.executeSync<Exercise>([workoutDayId]).getAllSync();
  } finally {
    statement.finalizeSync();
  }
}

export function getAllExercises(): Exercise[] {
  return db.getAllSync<Exercise>(
    "SELECT id, workout_day_id, name, sets, reps, weight, position FROM exercises ORDER BY position ASC",
  );
}
