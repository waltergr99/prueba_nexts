import { Request, Response } from "express";
import { GetResponse, PostResponse, RequestExt } from "../type";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";
import { getMoviesService, getMovieService, getCommentsService } from "../services/app";

const getMovies = async (req: RequestExt, res: Response) => {
  try {
    const { page, search } = req.params;
    const movies = await getMoviesService(page, search);

    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<GetResponse> = {
      status: 200,
      token: token,
      movies: movies
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR PELICULAS", e);
  }
};

const getMovie = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await getMovieService(id);
    
    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<PostResponse> = {
      status: 200,
      token: token,
      movie: movie,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR PELICULA", e);
  }
};

const getComments = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const { last } = req.body;
    const comments = await getCommentsService(id, last);

    const idU = req.idUser?.idUser;
    const token = generateToken(`${idU}`);

    const response: Partial<GetResponse> = {
      status: 200,
      token: token,
      comments: comments,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR COMENTARIO", e);
  }
};

export { getMovies, getMovie, getComments };
