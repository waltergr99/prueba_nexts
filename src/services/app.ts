import { Movie, Status, Comment, Scope } from "../type";
import MovieModel from "../models/movie.model";
import CommentModel from "../models/comment.model";
import util from "node:util";

const getMoviesService = async (
  page: string,
  search: string
): Promise<Movie[] & Partial<Scope>> => {
  let pageNumber = parseInt(page);
  console.log(pageNumber)
  console.log(isNaN(pageNumber))
  if(isNaN(pageNumber) || pageNumber < 0)throw Error("ERROR PAGINA, SOLO NUMEROS, Y MAYOR A 1");

  const limit = 10
  let startIndex = (pageNumber - 1) * limit;

  const movies = await MovieModel.find<Movie>({
    status: Status.ACEPTADO,
    name: new RegExp(search, "i"),
  }).sort("-_id").skip(startIndex).limit(limit);
  
  return movies;
};

const getMovieService = async (id: string): Promise<Movie> => {
  const movie = await MovieModel.findOne({ _id: id });
  if (!movie) throw Error("NO SE ENCONTRO PELICULA");

  return movie;
};

const getCommentsService = async (
  id: string,
  last: string
): Promise<Comment[]> => {
  //TODO Agregar Funcion de cursor para paginado

  const comments = await CommentModel.find<Comment>({ idMovie: id }); 
  return comments;
};

export { getMoviesService, getMovieService, getCommentsService };
