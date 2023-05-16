import { Movie, Status, Comment } from "../type";
import MovieModel from "../models/movie.model";
import CommentModel from "../models/comment.model";
import util from "node:util";
import { getAverageQualification } from "../utils/global";

const setCommentService = async (data: Partial<Comment>): Promise<Comment> => {
  if (data.comment == null || data.idUser == "")
    throw Error("ERROR COMENTARIO");
  if (data.qualification == null || !util.isNumber(data.qualification))
    throw Error("ERROR CALIFICACION");
  if (data.idMovie == null || data.idMovie == "") throw Error("ERROR PELICULA");
  if (data.idUser == null || data.idUser == "") throw Error("ERROR USUARIO");

  const checkMovie = await MovieModel.findOne({ _id: data.idMovie });
  if (!checkMovie) throw Error("PELICULA INCORRECTA");

  const newComment = await CommentModel.create({
    comment: data.comment,
    idMovie: data.idMovie,
    qualification: data.qualification,
    idUser: data.idUser,
  });

  if (!newComment) throw Error("ERROR REGISTRAR COMENTARIO");

  const newQualificationMovie = await getAverageQualification(newComment.idMovie);

  const movie = await MovieModel.findOneAndUpdate(
    { _id: newComment.idMovie },
    { qualification: newQualificationMovie },
    {
      new: true,
    }
  );

  return newComment;
};

const setRequestMovieService = async (data: Partial<Movie>): Promise<Movie> => {
  if (data.idUser == null || data.idUser == "") throw Error("ERROR USUARIO");
  if (data.name == null || data.name == "") throw Error("ERROR NOMBRE");

  const newMovie = await MovieModel.create({
    idUser: data.idUser,
    name: data.name,
    qualification: 0,
    status: Status.PENDIENTE,
  });

  if (!newMovie) throw Error("ERROR REGISTRAR PELICULA");

  return newMovie;
};

export { setCommentService, setRequestMovieService };
