import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import { connectDb } from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import taskRoutes from "./routes/tasks.Routes.js";
import userRoutes from "./routes/user.Routes.js";
const app = express();
dotenv.config();
// db connection
connectDb();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("tiny"));

// routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// error handling
app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server running on port ${port}`));
