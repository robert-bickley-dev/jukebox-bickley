import express from "express";
const router = express.Router();
export default router;

import { getPlaylists } from "#db/queries/playlists";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});
