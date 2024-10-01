import { Router } from "express";
import { Film, NewFilm } from "../types";

const films: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160000000,
    description:
      "A skilled thief is given a chance at redemption if he can successfully perform inception.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    duration: 136,
    budget: 63000000,
    description:
      "A hacker discovers the truth about reality and fights against powerful machines.",
    // Pas d'image ici
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon-ho",
    duration: 132,
    description:
      "A poor family schemes to become employed by a wealthy family.",
    imageUrl: "https://example.com/parasite.jpg",
  },
];

const router = Router();

router.get("/", (_req, res) => {
  if(!_req.query.minimumDuration){
    return res.json(films);
  };
  const minimumDuration = Number(_req.query.minimumDuration);
  const filteredFilms = films.filter(film => film.duration >= minimumDuration)
  return res.json(filteredFilms);
});

router.get("/:id", (_req, res) => {
  const id = Number(_req.params.id);
  const film = films.find(film => film.id === id);
  if(!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

router.get("/sorted", (req, res) => {
  
})

router.post("/", (req,res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
  ){
    return res.sendStatus(400);
  }
  const { title, director, duration, budget, description, imageUrl } = req.body;
  if( !title || !director || !duration) {
    return res.sendStatus(400);
  };
  if(budget<0){
    res.json("Wrong minimum budget")
  };
  if(duration<0){
    res.json("Wrong minimum duration")
  };
  const nextId = 
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
  
  const newFilm : Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl
  };

  films.push(newFilm);
  return res.json(newFilm);
});

export default router;
