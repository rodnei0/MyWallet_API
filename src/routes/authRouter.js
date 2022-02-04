import { Router } from "express";
import { login } from "../controlers/authControler.js";
import validateLoginSchema from "../midllewares/validateLoginSchema.js";

const authRouter = Router();
authRouter.post("/login", validateLoginSchema, login);
export default authRouter;