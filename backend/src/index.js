import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

//config before accessing env variables
dotenv.config();

const app = express();

const port = process.env.PORT;

//all middewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

//all routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log("Server started on port- ", port);
  connectDB();
});
