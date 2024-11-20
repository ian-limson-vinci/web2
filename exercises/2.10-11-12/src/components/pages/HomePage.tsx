import PageTitle from "../PageTitle";
import { MovieContext } from "../../types";
import { useOutletContext, Link } from "react-router-dom";

const HomePage = () => {
  const { movies }: MovieContext = useOutletContext();

  return (
    <div>
      <PageTitle title="myMovies" />
      <p>
        Welcome to myMovies, a site where you can find info about cinemas,
        movies...
      </p>
      <h2>List of my favourite movies' titles</h2>
      <ul>
        {movies.map((movie) => (
          <Link to={`movie-page/${movie.title}`} style={{display: "block"}}>{movie.title}</Link>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
