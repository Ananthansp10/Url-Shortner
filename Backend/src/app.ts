import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import urlRouter from "./routes/urlRouter";
import commonRouter from "./routes/commonRouter";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", commonRouter);
app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

export default app;
