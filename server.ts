import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helment from "helmet";
import morgan from "morgan";

import * as Routers from "@routes";

dotenv.config();

const app = express();
const ROOT_URL = process.env.ROOT_URL!;

// ========================== MIDDLEWARES ==========================
app
  .use(
    cors({
      origin: process.env.CLIENT!,
      credentials: true,
    })
  )
  .use(helment())
  .use(morgan(process.env.NODE_ENV === "development" ? "dev" : "short"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// ========================== MIDDLEWARES END ==========================

// ========================== ROUTES ==========================

app.use(`${ROOT_URL}/event`, Routers.EventRouter);

// ========================== ROUTES END ==========================

app.listen(process.env.PORT!, () => {
  console.log(
    `Server listening at port:${process.env.PORT} in mode:${process.env.NODE_ENV}`
  );
});
