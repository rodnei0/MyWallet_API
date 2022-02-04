import { Router } from "express";
import { login, signup } from "../controlers/authControler.js";
import validateLoginSchema from "../midllewares/validateLoginSchema.js";
import validateSignupSchema from "../midllewares/validateSignupSchema.js";

const authRouter = Router();
authRouter.post("/login", validateLoginSchema, login);
authRouter.post("/sign-up", validateSignupSchema, signup);
export default authRouter;