import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import convertCamelToSnake from "./middleware/camel-to-snake.js";
import gamerProfile from "./routes/gamer-profile.js";
import gamerActivity from "./routes/gamer-activity.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(convertCamelToSnake);

app.use("/api", gamerProfile);
app.use("/api", gamerActivity);

const port = 8000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export default app;
