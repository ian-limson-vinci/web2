import { Movie } from "../types";
import "./MovieCard.css"

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movieCard">
      <h1>{movie.title}</h1>
      <strong>Directed by : {movie.director}</strong>
      <strong>Duration : {movie.duration} minutes</strong>
      <p>{movie.description ? `Description : ${movie.description}`: null}</p>
      <p>{movie.budget ? `Budget : ${movie.budget} millions` : null}</p>
    </div>
  );
};

export default MovieCard;
