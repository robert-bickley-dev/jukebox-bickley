import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createPlaylist } from "#db/queries/playlists";
import { createTrack } from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 10; i++) {
    const randomPlaylistName = faker.music.artist();
    const randomPlaylistDescription = faker.music.genre();
    const playlist = await createPlaylist(
      randomPlaylistName,
      randomPlaylistDescription,
    );
    for (let j = 0; j < 5; j++) {
      const randomTrackName = faker.music.songName();
      const randomDuration = faker.number.int({ min: 150000, max: 480000 });
      const track = await createTrack(randomTrackName, randomDuration);
      await createPlaylistTrack(playlist.id, track.id);
    }
  }
}
