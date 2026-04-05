import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("workout.db");

export function initDatabase() {
  // ⚠️ DEV ONLY: wipe database
  db.execSync(`
    DROP TABLE IF EXISTS exercises;
    DROP TABLE IF EXISTS workout_days;
  `);
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS workout_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      position INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_day_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      sets INTEGER NOT NULL,
      reps INTEGER NOT NULL,
      weight REAL NOT NULL DEFAULT 0,
      position INTEGER NOT NULL,
      FOREIGN KEY (workout_day_id) REFERENCES workout_days(id) ON DELETE CASCADE
    );
  `);

  const dayCount = db.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM workout_days",
  );

  if ((dayCount?.count ?? 0) === 0) {
    seedDatabase();
  }
}

function seedDatabase() {
  db.execSync(`
    INSERT INTO workout_days (name, position, color) VALUES
      ('Monday', 1, '#ebd3a3'),
      ('Wednesday', 2,'#e7ae69'),
      ('Friday', 3, '#12394a'),
      ('Saturday', 4, '#3d7189');
  `);

  const monday = db.getFirstSync<{ id: number }>(
    "SELECT id FROM workout_days WHERE name = 'Monday'",
  );
  const wednesday = db.getFirstSync<{ id: number }>(
    "SELECT id FROM workout_days WHERE name = 'Wednesday'",
  );
  const friday = db.getFirstSync<{ id: number }>(
    "SELECT id FROM workout_days WHERE name = 'Friday'",
  );
  const saturday = db.getFirstSync<{ id: number }>(
    "SELECT id FROM workout_days WHERE name = 'Saturday'",
  );

  if (!monday || !wednesday || !friday || !saturday) return;

  const insertExercise = db.prepareSync(`
    INSERT INTO exercises (workout_day_id, name, sets, reps, weight, position)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  try {
    insertExercise.executeSync([monday.id, "Bench Press", 4, 8, 100, 1]);
    insertExercise.executeSync([
      monday.id,
      "Incline Dumbbell Press",
      3,
      10,
      50,
      2,
    ]);
    insertExercise.executeSync([wednesday.id, "Barbell Row", 3, 10, 20, 2]);
    insertExercise.executeSync([friday.id, "Squat", 4, 6, 100, 1]);
    insertExercise.executeSync([friday.id, "Leg Press", 3, 12, 200, 2]);
    insertExercise.executeSync([saturday.id, "Shoulder Press", 4, 8, 50, 1]);
    insertExercise.executeSync([saturday.id, "Lateral Raise", 3, 15, 25, 2]);
  } finally {
    insertExercise.finalizeSync();
  }
}
