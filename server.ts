// ==================== TOP OF FILE CONFIG =====================

import dotenv from "dotenv";
dotenv.config();

// ========================== IMPORTS ==========================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import pc from "picocolors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

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
  .use(morgan(process.env.NODE_ENV === "production" ? "short" : "dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// ========================== DOCS ==========================

const swaggerDocument = YAML.load(Constants.Server.DOCS);

app.use(
  `${Constants.Server.ROOT}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Veritas API, GDSC NIT Silchar",
  })
);

// ========================== ROUTES ==========================

app.get(`${Constants.Server.ROOT}/`, Controllers.Health.check);

// ========================== ROUTERS ==========================

app.use(`${Constants.Server.ROOT}/event`, Routers.Event);
app.use(`${Constants.Server.ROOT}/person`, Routers.Person);
app.use(`${Constants.Server.ROOT}/student`, Routers.Student);

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
