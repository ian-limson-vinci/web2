import { Router } from "express";
import { Film } from "../types";

const films: Film[] = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      duration: 148,
      budget: 160000000,
      description: "A skilled thief is given a chance at redemption if he can successfully perform inception.",
      imageUrl: "https://example.com/inception.jpg"
    },
    {
      id: 2,
      title: "The Matrix",
      director: "The Wachowskis",
      duration: 136,
      budget: 63000000,
      description: "A hacker discovers the truth about reality and fights against powerful machines."
      // Pas d'image ici
    },
    {
      id: 3,
      title: "Parasite",
      director: "Bong Joon-ho",
      duration: 132,
      description: "A poor family schemes to become employed by a wealthy family.",
      imageUrl: "https://example.com/parasite.jpg"
    }
  ];

const router = Router();

router.get("/", (_req, res) => {
   return res.json(films);
 });
  
export default router; 