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
// ─── Merged ────────────────────────────────────────────────────────────────

type WorkoutDayRow = {
  exercise_id: number;
  exercise_name: string;
  notes: string | null;
  exercise_position: number;

  set_id: number | null;
  weight: number | null;
  reps: number | null;
  sets: number | null;
  set_position: number | null;
};

type ExerciseWithSets = {
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

export const getWorkoutDayFull = (workoutDayId: number): ExerciseWithSets[] => {
  const rows = db.getAllSync(
    `
    SELECT 
      e.id AS exercise_id,
      e.name AS exercise_name,
      e.notes,
      e.position AS exercise_position,

      s.id AS set_id,
      s.weight,
      s.reps,
      s.sets,
      s.position AS set_position

    FROM exercises e
    LEFT JOIN exercise_sets s
      ON e.id = s.exercise_id

    WHERE e.workout_day_id = ?
    ORDER BY e.position, s.position
    `,
    [workoutDayId],
  ) as WorkoutDayRow[];

  const map = new Map<number, ExerciseWithSets>();

  for (const row of rows) {
    if (!map.has(row.exercise_id)) {
      map.set(row.exercise_id, {
        id: row.exercise_id,
        name: row.exercise_name,
        notes: row.notes,
        position: row.exercise_position,
        sets: [],
      });
    }

    if (row.set_id != null) {
      map.get(row.exercise_id)!.sets.push({
        id: row.set_id,
        weight: row.weight ?? 0,
        reps: row.reps ?? 0,
        sets: row.sets ?? 1,
        position: row.set_position ?? 0,
      });
    }
  }

  return Array.from(map.values());
};
