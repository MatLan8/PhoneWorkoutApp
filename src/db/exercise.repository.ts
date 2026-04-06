import * as SQLite from "expo-sqlite";
import {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
  ExerciseSet,
  CreateExerciseSetInput,
  UpdateExerciseSetInput,
} from "../types/Exercise";
import { WorkoutDay } from "../types/WorkoutDay";

const db = SQLite.openDatabaseSync("workout.db");

// ─── Exercises ────────────────────────────────────────────────────────────────

export function createExercise(input: CreateExerciseInput) {
  const statement = db.prepareSync(`
    INSERT INTO exercises (
      workout_day_id,
      name,
      position,
      notes,
    )
    VALUES (?, ?, ?, ?)
  `);
  try {
    const result = statement.executeSync([
      input.workout_day_id,
      input.name,
      input.position,
      input.notes ?? null,
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

  if (input.position !== undefined) {
    updates.push("position = ?");
    values.push(input.position);
  }

  if (input.notes !== undefined) {
    updates.push("notes = ?");
    values.push(input.notes);
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
    SELECT id, workout_day_id, name, notes, position
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
    "SELECT id, workout_day_id, name, notes, position FROM exercises ORDER BY position ASC",
  );
}

// ─── Exercise Sets ────────────────────────────────────────────────────────────────
export function createExerciseSet(input: CreateExerciseSetInput) {
  const statement = db.prepareSync(`
    INSERT INTO exercise_sets (
      exercise_id,
      weight,
      reps,
      sets,
      position
    )
    VALUES (?, ?, ?, ?, ?)
  `);
  try {
    const result = statement.executeSync([
      input.exercise_id,
      input.weight,
      input.reps,
      input.sets,
      input.position,
    ]);

    const inserted = db.getFirstSync<ExerciseSet>(
      `
      SELECT *
      FROM exercise_sets
      WHERE id = last_insert_rowid()
      `,
    );
    return inserted;
  } finally {
    statement.finalizeSync();
  }
}

export function getExerciseSetsByExerciseId(exerciseId: number): ExerciseSet[] {
  const statement = db.prepareSync(`
    SELECT id, exercise_id, weight, reps, sets, position
    FROM exercise_sets
    WHERE exercise_id = ?
    ORDER BY position ASC
  `);

  try {
    return statement.executeSync<ExerciseSet>([exerciseId]).getAllSync();
  } finally {
    statement.finalizeSync();
  }
}

export function updateExerciseSets(
  input: UpdateExerciseSetInput,
): ExerciseSet | null {
  const updates: string[] = [];
  const values: any[] = [];

  if (input.weight !== undefined) {
    updates.push("weight = ?");
    values.push(input.weight);
  }
  if (input.reps !== undefined) {
    updates.push("reps = ?");
    values.push(input.reps);
  }
  if (input.sets !== undefined) {
    updates.push("sets = ?");
    values.push(input.sets);
  }

  if (input.position !== undefined) {
    updates.push("position = ?");
    values.push(input.position);
  }

  // nothing to update
  if (updates.length === 0) return null;

  const query = `
    UPDATE exercise_sets
    SET ${updates.join(", ")}
    WHERE id = ?
  `;

  values.push(input.id);

  const statement = db.prepareSync(query);

  try {
    statement.executeSync(values);

    return db.getFirstSync<ExerciseSet>(
      `SELECT * FROM exercise_sets WHERE id = ?`,
      [input.id],
    );
  } finally {
    statement.finalizeSync();
  }
}
