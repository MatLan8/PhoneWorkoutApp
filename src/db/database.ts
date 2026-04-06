import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("workout.db");

export function initDatabase() {
  // ⚠️ DEV ONLY: wipe database
  db.execSync(`
    DROP TABLE IF EXISTS exercise_sets;
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
      notes TEXT,
      position INTEGER NOT NULL,
      FOREIGN KEY (workout_day_id) REFERENCES workout_days(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exercise_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_id INTEGER NOT NULL,
      weight REAL NOT NULL DEFAULT 0,
      reps INTEGER NOT NULL DEFAULT 0,
      sets INTEGER NOT NULL DEFAULT 1,
      position INTEGER NOT NULL,
      FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
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
      ('Monday',    1, '#ebd3a3'),
      ('Wednesday', 2, '#e7ae69'),
      ('Friday',    3, '#12394a'),
      ('Saturday',  4, '#3d7189');
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

  const insertExercise = db.prepareSync(
    "INSERT INTO exercises (workout_day_id, name, position) VALUES (?, ?, ?)",
  );
  const insertSet = db.prepareSync(
    "INSERT INTO exercise_sets (exercise_id, weight, reps, sets, position) VALUES (?, ?, ?, ?, ?)",
  );

  // Helper: inserts an exercise and seeds sets for it
  const seed = (
    dayId: number,
    name: string,
    pos: number,
    sets: { weight: number; reps: number; sets: number }[],
  ) => {
    insertExercise.executeSync([dayId, name, pos]);
    const ex = db.getFirstSync<{ id: number }>(
      "SELECT id FROM exercises WHERE rowid = last_insert_rowid()",
    );
    if (!ex) return;
    sets.forEach((s, i) =>
      insertSet.executeSync([ex.id, s.weight, s.reps, s.sets, i + 1]),
    );
  };

  try {
    seed(monday.id, "Bench Press", 1, [
      { weight: 100, reps: 8, sets: 1 },
      { weight: 100, reps: 8, sets: 1 },
      { weight: 95, reps: 6, sets: 1 },
    ]);
    seed(monday.id, "Incline Dumbbell Press", 2, [
      { weight: 50, reps: 10, sets: 1 },
      { weight: 50, reps: 10, sets: 1 },
      { weight: 50, reps: 8, sets: 1 },
    ]);
    seed(wednesday.id, "Barbell Row", 1, [
      { weight: 80, reps: 10, sets: 1 },
      { weight: 80, reps: 10, sets: 1 },
      { weight: 80, reps: 8, sets: 1 },
    ]);
    seed(friday.id, "Squat", 1, [
      { weight: 100, reps: 6, sets: 1 },
      { weight: 100, reps: 6, sets: 1 },
      { weight: 95, reps: 5, sets: 1 },
    ]);
    seed(friday.id, "Leg Press", 2, [
      { weight: 200, reps: 12, sets: 1 },
      { weight: 200, reps: 12, sets: 1 },
      { weight: 200, reps: 10, sets: 1 },
    ]);
    seed(saturday.id, "Shoulder Press", 1, [
      { weight: 50, reps: 8, sets: 1 },
      { weight: 50, reps: 8, sets: 1 },
      { weight: 45, reps: 6, sets: 1 },
    ]);
    seed(saturday.id, "Lateral Raise", 2, [
      { weight: 25, reps: 15, sets: 1 },
      { weight: 25, reps: 15, sets: 1 },
      { weight: 25, reps: 12, sets: 1 },
    ]);
  } finally {
    insertExercise.finalizeSync();
    insertSet.finalizeSync();
  }
}
