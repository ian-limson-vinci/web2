import { MovieContext, Movie } from "../types";
import { useOutletContext, useMatch } from "react-router-dom";
import MovieCard from "./MovieCard";


const MoviePage = () => {
    console.log("test");
    const { movies }: MovieContext = useOutletContext();
    const match = useMatch("/movie-page/:title");
    const movieTitle = match?.params.title;
    console.log(movieTitle);
    if (!movieTitle) return <h1>Movie not found</h1>

    const movieDetail = movies.find((movie) => movieTitle === movie.title);
    if (!movieDetail) return <h1>Movie not found</h1>

    return (
        <div>
            <MovieCard movie={movieDetail} />
        </div>
    )
}

export default MoviePage;