import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import toobusy_js from "toobusy-js";
import compression from "compression";
import scrawny from "scrawny";

const app: Express = express();

//APP MIDDLE-WARES
// Middleware
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(hpp());
app.use(compression());
app.disable("x-powered-by");

//APP ROUTES - IMPORT
import { default as routes } from "./routes";

// TOO BUSY
app.use((req: Request, res: Response, next: Function) => {
  if (toobusy_js()) {
    return res.status(429).send("Too busy!");
  }
  next();
});

// SCRAWNY
app.use(
  scrawny({
    log: process.env.NODE_ENV !== "production",
    format: "[METHOD] [URL] [TIME]",
  })
);

app.use("/", routes);

export default app;
