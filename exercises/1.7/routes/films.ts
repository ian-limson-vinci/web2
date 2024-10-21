import { Router } from "express";
import { Film, NewFilm } from "../types";
import path from "node:path";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Shang-Chi and the Legend of the Ten Rings",
    director: "Destin Daniel Cretton",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    budget: 150,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    budget: 63,
  },
  {
    id: 3,
    title: "Summer Wars",
    director: "Mamoru Hosoda",
    duration: 114,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },
  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  },
  {
    id: 5,
    title: "her",
    director: "Spike Jonze",
    duration: 126,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    budget: 23,
  },
];


const router = Router();

router.get("/", (_req, res) => {
  const films = parse(jsonDbPath, defaultFilms);
  if(!_req.query.minimumDuration){
    return res.json(films);
  };
  
  const minimumDuration = Number(_req.query.minimumDuration);

  if(isNaN(minimumDuration) || minimumDuration<=0) {
    return res.sendStatus(400);
  };

  const filteredFilms = films.filter(film => film.duration >= minimumDuration)
  return res.json(filteredFilms);
});

router.get("/:id", (_req, res) => {
  const id = Number(_req.params.id);
  const films = parse(jsonDbPath, defaultFilms);
  if(isNaN(id)){
    res.sendStatus(400);
  }
  const film = films.find(film => film.id === id);
  if(!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

router.post("/", (req,res) => {
  const films = parse(jsonDbPath, defaultFilms);
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

  const existingFilm = films.find(
    (film) =>
      film.title.toLowerCase() === newFilm.title.toLowerCase() &&
      film.director.toLowerCase() === newFilm.director.toLowerCase()
  );

  if (existingFilm) {
    return res.sendStatus(409);
  }

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

router.delete("/:id", (req,res) => {
  const films = parse(jsonDbPath, defaultFilms);

  const id = Number(req.params.id);

  const index = films.findIndex((film) => film.id === id);
  if (index === -1) {
    return res.sendStatus(400);
  }

  const deletedElements = films.splice(index, 1);

  serialize(jsonDbPath, films);

  return res.json(deletedElements[0]);
})

router.patch("/:id", (req,res) => {

  const films = parse(jsonDbPath, defaultFilms);

  const id = Number(req.params.id);

  const film = films.find((film) => film.id === id);

  if (!film) {
    console.log("2");
    return res.sendStatus(400);
  }

  const body: unknown = req.body

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body && (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body && (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && (typeof body.duration !== "number" || body.duration <=0)) ||
    ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
    ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <=0)) 
  ) {
    console.log("1");
    return res.sendStatus(400);
  }


  const { title, director, duration, imageUrl, description, budget } : Partial<NewFilm> = body;

  if (title) {
    film.title = title;
  }
  if (director) {
    film.director = director;
  }
  if (duration) {
    film.duration = duration;
  }
  if (imageUrl) {
    film.imageUrl = imageUrl;
  }
  if (description) {
    film.description = description;
  }
  if (budget) {
    film.budget = budget;
  }

  serialize(jsonDbPath, films);
  return res.json(film);

})

router.put("/:id", (req,res) => {
  
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
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((film) => film.id === id);

  if (index < 0) {
    const newFilm = body as NewFilm;

    const nextId = films.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;

    const addedFilm = { id: nextId, ...newFilm };

    films.push(addedFilm);

    serialize(jsonDbPath, films);
    return res.json(addedFilm);
  }

  const updatedFilm = {...films[index], ...body} as Film;

  films[index] = updatedFilm;

  serialize(jsonDbPath, films);
  
  return res.json(updatedFilm);
})

export default router;