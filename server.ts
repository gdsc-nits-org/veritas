import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT!, () => {
  console.log(
    `Server listening at port:${process.env.PORT} in mode:${process.env.NODE_ENV}`
  );
});
