import { Router } from "express";
import { signup } from "../controlers/userController.js";
import validateSignupSchema from "../midllewares/validateSignupSchema.js";

const userRouter = Router();
userRouter.post("/sign-up", validateSignupSchema, signup);
export default userRouter;