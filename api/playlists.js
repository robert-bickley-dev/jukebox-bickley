import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
} from "#db/queries/playlists";

import { getTracksByPlaylistId } from "#db/queries/tracks";

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

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) res.status(404).send("Playlist not found");

  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});
