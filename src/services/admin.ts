import { Movie, Status, Comment, User } from "../type";
import MovieModel from "../models/movie.model";
import CommentModel from "../models/comment.model";
import UserModel from "../models/user.model";
import { getAverageQualification } from "../utils/global"
const getUsersService = async (search: string): Promise<User[]> => {
  const users = await UserModel.find<User>({ user: new RegExp(search, "i") });
  return users;
};

const getCommentsService = async (id: string): Promise<Comment[]> => {
  const comments = await CommentModel.find<Comment>({ idUser: id });
  return comments;
};

const deleteCommentService = async (idComment: string): Promise<Comment> => {
  const comment = await CommentModel.findOne({ _id: idComment });
  if (!comment) throw Error("NO SE ENCONTRO COMENTARIO");

  const deletedcomment = await CommentModel.findOneAndRemove({ _id: idComment });

  if (!deletedcomment)
    throw Error("ERROR ELIMINAR COMENTARIO");

  const newQualificationMovie = await getAverageQualification(
    comment.idMovie
  );

  const movie = await MovieModel.findOneAndUpdate(
    { _id: comment.idMovie },
    { qualification: newQualificationMovie },
    {
      new: true,
    }
  );

  return comment;
};

const aceptRequestMovieService = async (idMovie: string): Promise<Movie> => {
  const checkMovie = await MovieModel.findOne({ _id: idMovie });
  if (!checkMovie) throw Error("PELICULA INCORRECTA");
  if (checkMovie.status != Status.PENDIENTE)
    throw Error("PELICLA NO ESTA PENDIENTE");

  const movie = await MovieModel.findOneAndUpdate(
    { _id: idMovie },
    { status: Status.ACEPTADO },
    {
      new: true,
    }
  );

  if (!movie) throw Error("ERROR ACEPTAR PELICULA");

  return movie;
};

export {
  getUsersService,
  getCommentsService,
  deleteCommentService,
  aceptRequestMovieService,
};
