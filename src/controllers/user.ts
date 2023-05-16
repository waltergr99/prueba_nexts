import { Request, Response } from "express";
import { RequestExt, PostResponse } from "../type";
import { setCommentService, setRequestMovieService } from "../services/user";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

const setComment = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const comment = await setCommentService(body);

    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<PostResponse> = {
      status: 200,
      token: token,
      comment: comment
    }

    res.send(response);
  }
  catch (e: any) {
    handleError(res, "ERROR COMENTARIO", e)
  }
};

const setRequestMovie = async (req: RequestExt, res: Response ) => {
  try {
    const { body } = req;
    const movie = await setRequestMovieService(body);

    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response : Partial<PostResponse> = {
      status: 200,
      token: token,
      movie: movie
    }

    res.send(response)
  }
  catch (e: any) {
    handleError(res, "ERROR PELICULA", e)
  }
};

export {
  setComment,
  setRequestMovie,
}