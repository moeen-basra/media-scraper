import "dotenv/config";
import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { mediaRoutes } from "./routes";
import { sequelize } from "./config";
import errorMiddleware from "./middleware/error";
import logger from "./config/logger";
import morganMiddleware from "./middleware/logger";
import cors from 'cors'

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const app: Application = express();

app.use(cors());
app.use(express.json())
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(morganMiddleware);

// routes
app.use("/media", mediaRoutes);

// console.log(process.env);

logger.info(process.env);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error: " + err));
