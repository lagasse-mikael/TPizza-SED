import dayjs from "dayjs";
import express from "express";
import database from "./src/libs/database.js";

import methodMiddleware from './src/middlewares/method.js';
import errorMiddleware from'./src/middlewares/errors.js';


database();

const app = express();

app.use(express.json());
app.use(methodMiddleware);



app.get("/", (req, res) => 
{
    res.status(200);
    res.set("Content-Type", "text/plain");
    res.send("Initialisation du serveur");
});


app.use (errorMiddleware);
export default app;