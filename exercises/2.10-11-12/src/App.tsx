import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { Movie } from "./types";
import Cinema from "./Cinema/Cinema";
import MovieList from "./MovieList/MovieList";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cinema")}>Cinema</button>
      <button onClick={() => navigate("/movielist")}>Movie List</button>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenue sur iMovies !</h1>
      <p>L'objectif de ce site est d'implémenter la théorie du cours de JS sur le routage des écrans.</p>
      <p>Utilisez la barre de navigation pour voir les différents écrans.</p>
    </div>
  );
};

const CinemaPage = () => {
  return (
    <div>
      <Cinema name={cinema1Name} movies={moviesCinema2} />
      <Cinema name={cinema2Name} movies={moviesCinema2} />
    </div>
  );
};

const MovieListPage = () => {
  const [movies, setMovies] = useState(defaultMovies);

  const [movie, setMovie] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newMovie = {
      title: movie,
      director: director,
      duration: duration,
      description: description,
      budget: budget,
    };

    setMovies([...movies, newMovie]);
  };

  const handleMovieChange = (e: SyntheticEvent) => {
    const movieInput = e.target as HTMLInputElement;
    setMovie(movieInput.value);
  };

  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement;
    setDirector(directorInput.value);
  };

  const handleDurationChange = (e: SyntheticEvent) => {
    const durationInput = e.target as HTMLInputElement;
    setDuration(parseInt(durationInput.value, 10));
  };

  const handleDescriptionChange = (e: SyntheticEvent) => {
    const descriptionInput = e.target as HTMLInputElement;
    setDescription(descriptionInput.value);
  };

  const handleBudgetChange = (e: SyntheticEvent) => {
    const budgetInput = e.target as HTMLInputElement;
    setBudget(parseInt(budgetInput.value, 10));
  };
  return (
    <div>
      <h1>List of movies</h1>
      <MovieList movies={movies} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie">Movie</label>
        <input
          value={movie}
          type="text"
          id="movie"
          name="movie"
          onChange={handleMovieChange}
          required
        />
        <br />
        <label htmlFor="director">Director</label>
        <input
          value={director}
          type="text"
          id="dircetor"
          name="director"
          onChange={handleDirectorChange}
          required
        />
        <br />
        <label htmlFor="duration">Duration</label>
        <input
          value={duration}
          type="text"
          id="duration"
          name="duration"
          onChange={handleDurationChange}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          value={description}
          type="text"
          id="description"
          name="description"
          onChange={handleDescriptionChange}
          required
        />
        <br />
        <label htmlFor="description">Budget</label>
        <input
          value={budget}
          type="text"
          id="budget"
          name="budget"
          onChange={handleBudgetChange}
          required
        />
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header logoUrl={logo}>
        <h1>Header</h1>
      </Header>
      <Outlet />
      <NavBar />
      <Footer logoUrl={logo}>
        <h1>Footer</h1>
      </Footer>
    </div>
  );
}

const cinema1Name = "UGC De Brouckère";

const logo =
  "https://plus.unsplash.com/premium_vector-1727958428914-fa6dfdd754fc?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const moviesCinema1 = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    description:
      "A thief skilled in dream infiltration must complete a mission in dreams to escape his past.",
    budget: 160,
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    description:
      "A hacker discovers the true nature of reality and leads a rebellion against oppressors.",
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    description:
      "A group of astronauts travels through a wormhole to find a new home for humanity.",
    budget: 165,
  },
];

const cinema2Name = "UGC Toison d'Or";

const moviesCinema2 = [
  {
    title: "Parasite",
    director: "Bong Joon-ho",
    duration: 132,
    description:
      "A social satire where a poor family infiltrates the lives of a wealthy family.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
    budget: 6,
  },
];

const defaultMovies: Movie[] = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    description:
      "A thief skilled in dream infiltration must complete a mission in dreams to escape his past.",
    budget: 160,
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    description:
      "A hacker discovers the true nature of reality and leads a rebellion against oppressors.",
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    description:
      "A group of astronauts travels through a wormhole to find a new home for humanity.",
    budget: 165,
  },
  {
    title: "Parasite",
    director: "Bong Joon-ho",
    duration: 132,
    description:
      "A social satire where a poor family infiltrates the lives of a wealthy family.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
    budget: 6,
  },
];

export default App;
export { HomePage, CinemaPage, MovieListPage };
