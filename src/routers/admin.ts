import { Router } from "express";
import { getUsers, getComments, deleteComment, aceptRequestMovie } from "../controllers/admin";
import { checkJwt, isAdmin, isUser } from "../middlewares/session";

const router = Router();
router.get("/users/:search?", checkJwt, isAdmin , getUsers);
router.get("/comments/:id", checkJwt, isAdmin, getComments)
router.delete("/comment/:id", checkJwt, isAdmin, deleteComment)
router.post("/aceptRequestMovie/:id", checkJwt, isAdmin, aceptRequestMovie)

export { router };