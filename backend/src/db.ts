import Database from 'better-sqlite3';

const db = new Database('database.sqlite', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT,
    preferences_json TEXT,
    mistake_fingerprint_json TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    question TEXT,
    attempted_answer TEXT,
    subject TEXT,
    submission_time TEXT,
    tone_preference TEXT,
    is_demo_mode INTEGER,
    analysis_result_json TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

export default db;
