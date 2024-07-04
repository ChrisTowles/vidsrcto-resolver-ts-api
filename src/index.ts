import request from "superagent";

import express, { Request, Response } from "express";

import cors from "cors"


import dotenv from "dotenv"

import * as _ from "lodash";
import { Application } from "express";
import { searchForMedia } from "./searchForMedia";
import { MediaType } from "./models/media";

const app: Application = express();

const port = process.env.PORT || 8080;

dotenv.config()

app
  .use(cors())
  
  .get('/',(req: Request , res : Response)=>{
    res.send("hello from A1ze")
  })

  .get("/movie/:tmdbId", async (req: Request, res: Response) => {

    const resp = await searchForMedia({
      mediaType: MediaType.movie,
      id: req.params.tmdbId
    });

    if (resp) {
      res.json(resp);
    } else {
      res.json({});
    }
  })

  .get("/tv/:tmdbId/:season/:episode", async (req: Request, res: Response) => {
    const resp = await searchForMedia({
      mediaType: MediaType.tv,
      id: req.params.tmdbId,
      ifTV: {
        season: Number.parseInt(req.params.season),
        episode: Number.parseInt(req.params.episode)
       },
    }
      
    );

    if (resp) {
      res.json(resp);
    } else {
      res.json({});
    }
  })

  .listen(port, () => {
    console.log(`server is running on port http//localhost:${port}`);
  });

