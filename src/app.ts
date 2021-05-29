import express = require('express');
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

// Create a new express app instance
const app: express.Application = express();
const post = 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", itemsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(post, () => {
    console.log('App is listening on port ' + post +'!');
});