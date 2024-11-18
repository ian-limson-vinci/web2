import { Movie } from "../../types"
import { useState } from "react";

interface MovieItemProps {
    movie: Movie;
}

const MovieItem = ({movie} : MovieItemProps) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleClick = () => {
        setShowDescription(!showDescription);
    }

    return (
        <div onClick={handleClick}>
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
            {showDescription ? <p>{movie.description}</p> : null}
        </div>
        
    )
}

export default MovieItem;