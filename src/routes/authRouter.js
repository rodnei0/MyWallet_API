import { Router } from "express";
import { login, signup } from "../controlers/authControler.js";
import validateLoginSchemaMiddleware from "../midllewares/validateLoginSchemaMiddleware.js";
import validateSignupSchemaMiddleware from "../midllewares/validateSignupSchemaMiddleware.js";

const authRouter = Router();
authRouter.post("/login", validateLoginSchemaMiddleware, login);
authRouter.post("/sign-up", validateSignupSchemaMiddleware, signup);
export default authRouter;