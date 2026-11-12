CREATE TABLE IF NOT EXISTS revalidations (
  tag TEXT PRIMARY KEY,
  revalidatedAt INTEGER NOT NULL,
  stale INTEGER,
  expire INTEGER
);
