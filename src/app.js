import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import recordsRouter from "./routes/recordsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(userRouter);
app.use(recordsRouter);

app.listen(5000);