import { Request, Response } from "express";
import { GetResponse, PostResponse, RequestExt } from "../type";
import { getUsersService, getCommentsService, deleteCommentService, aceptRequestMovieService } from "../services/admin";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

const getUsers = async (req: RequestExt, res: Response) => {
  try {
    const { search } = req.params;
    const users = await getUsersService(search);

    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<GetResponse> = {
      status: 200,
      token: token,
      users: users
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR LOGIN", e);
  }
};

const getComments = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await getCommentsService(id);

    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<GetResponse> = {
      status: 200,
      token: token,
      comments: comments
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REGISTRO", e);
  }
};

const deleteComment = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await deleteCommentService(id);
    
    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<PostResponse> = {
      status: 200,
      token: token,
      comment: comment,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REGISTRO", e);
  }
};

const aceptRequestMovie = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await aceptRequestMovieService(id);
    
    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<PostResponse> = {
      status: 200,
      token: token,
      movie: movie,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REGISTRO", e);
  }
};

export { getUsers, getComments, deleteComment, aceptRequestMovie };
