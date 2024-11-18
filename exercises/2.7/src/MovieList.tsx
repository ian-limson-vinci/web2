import { Movie } from "./types";
import MovieCard from "./MovieCard";
import "./MovieList.css"

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
    return (
        <div className="movieList">
            {movies.map((movie) => (
                <MovieCard movie={movie} />
            ))}
        </div>
    )
}

export default MovieList