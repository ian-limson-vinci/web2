import express from "express";

import filmRouter from "./routes/films";

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

export default app;
