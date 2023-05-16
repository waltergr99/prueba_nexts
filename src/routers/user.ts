import { Router } from "express";
import { setComment, setRequestMovie } from "../controllers/user";
import { checkJwt, isUser } from "../middlewares/session";

const router = Router();
router.post("/comment/:id", checkJwt, isUser , setComment);
router.post("/requestMovie", checkJwt, isUser, setRequestMovie)

export { router };