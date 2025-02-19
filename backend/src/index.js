import express from 'express';
import cookieParser from "cookie-parser";
import router from "./routes/user.js";
import dotenv from "dotenv";
import { connectDB } from './lib/db.js';

//config before accessing env variables
dotenv.config();

const app = express();

const port = process.env.PORT;

//all middewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//all routes
app.use(router);

app.listen(port, () => {
    console.log("Server started on port- ", port);
    connectDB()
});
