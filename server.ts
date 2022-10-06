// ==================== TOP OF FILE CONFIG =====================

import dotenv from "dotenv";
dotenv.config();

// ========================== IMPORTS ==========================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import pc from "picocolors";

import * as Routers from "@routes";
import * as Constants from "@constants";
import * as Utils from "@utils";
import * as Controllers from "@controllers";

const app = express();

// ========================== MIDDLEWARES ==========================
app
  .use(
    cors({
      origin: "*",
    })
  )
  .use(helmet())
  .use(morgan(process.env.NODE_ENV === "development" ? "dev" : "short"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// ========================== ROUTES ==========================

app.get(`${Constants.Server.ROOT}/`, Controllers.Health.check);

// ========================== ROUTERS ==========================

app.use(`${Constants.Server.ROOT}/event`, Routers.EventRouter);

// ======================== ERROR HANDLERS ====================

app.use(Utils.Error.errorLogger);
app.use(Utils.Error.errorHandler);

// ========================== APP ==========================

app.listen(process.env.PORT!, () => {
  console.log(
    pc.bgGreen(
      pc.black(
        "Server listening on port:" +
          pc.bold(pc.italic(` ${process.env.PORT} `)) +
          ", in mode:" +
          pc.bold(pc.italic(` ${process.env.NODE_ENV} `))
      )
    )
  );
});
