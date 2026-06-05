import db from "#db/client";

export async function createTrack(name, durationMs) {
  const sql = `
    INSERT INTO tracks
      (name, duration_ms)
    VALUES
      ($1, $2)
    RETURNING *
    `;

  const {
    rows: [track],
  } = await db.query(sql, [name, durationMs]);
  return track;
}

export async function getTracks() {
  const sql = `
    SELECT *
    FROM tracks
    `;

  const { rows: tracks } = await db.query(sql);
  return tracks;
}
