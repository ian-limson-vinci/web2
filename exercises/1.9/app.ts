import express from "express";

import filmRouter from "./routes/films";
import textRouter from "./routes/texts";

const app = express();
let getCounter: number = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, _res, next) => {
  if (_req.method === "GET") {
    getCounter++;
    console.log("GET counter : " + getCounter);
  }
  next();
});

app.use("/films", filmRouter);
app.use("/texts", textRouter)

export default app;
