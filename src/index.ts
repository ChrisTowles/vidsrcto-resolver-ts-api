import request from "superagent";

import express, { Request, Response } from "express";

import cors from "cors"


import dotenv from "dotenv"

import * as _ from "lodash";
import { Application } from "express";
import { main_func } from "./main_func";
import { CONSTANTS } from "./constants";

const app: Application = express();

const port = process.env.PORT || 8080;

dotenv.config()

app
  .use(cors())
  
  .get('/',(req: Request , res : Response)=>{
    res.send("hello from A1ze")
  })

  .get("/movie/:tmdbId", async (req: Request, res: Response) => {
    const resp = await main_func(`embed/movie/${req.params.tmdbId}`);

    if (resp) {
      res.json(resp);
    } else {
      res.json({});
    }
  })

  .get("/tv/:tmdbId/:season/:episode", async (req: Request, res: Response) => {
    const resp = await main_func(
      `embed/tv/${req.params.tmdbId}/${req.params.season}/${req.params.episode}`
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




// init({
//   routes: ["./src"],

//   serve: { port: 8080 },
// });
