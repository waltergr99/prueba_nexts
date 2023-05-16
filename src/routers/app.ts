import { Router } from "express";
import { getMovies, getMovie, getComments } from "../controllers/app";

const router = Router();
router.get("/movies/:page/:search?", getMovies);
router.get("/movie/:id", getMovie)
router.get("/comments/:id/", getComments)

export { router };