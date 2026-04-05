import * as SQLite from "expo-sqlite";
import { WorkoutDay, CreateWorkoutDayInput } from "../types/WorkoutDay";

const db = SQLite.openDatabaseSync("workout.db");

export function getAllWorkoutDays(): WorkoutDay[] {
  return db.getAllSync<WorkoutDay>(
    "SELECT id, name, color, position FROM workout_days ORDER BY position ASC",
  );
}

export function createWorkoutDay(input: CreateWorkoutDayInput) {
  const statement = db.prepareSync(`
    INSERT INTO workout_days (
      name,
      color,
      position
    )
    VALUES (?, ?, ?)
  `);
  try {
    const result = statement.executeSync([
      input.name,
      input.color,
      input.position,
    ]);

    const inserted = db.getFirstSync<WorkoutDay>(
      `
      SELECT *
      FROM workout_days
      WHERE id = last_insert_rowid()
      `,
    );
    return inserted;
  } finally {
    statement.finalizeSync();
  }
}
