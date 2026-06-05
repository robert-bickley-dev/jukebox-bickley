import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
} from "#db/queries/playlists";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body");
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request requires name and description");
  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.get("/:id", async (req, res) => {
  const playlist = await getPlaylistById(req.params.id);
  if (!playlist) res.status(404).send("Playlist not found");
  res.send(playlist);
});
