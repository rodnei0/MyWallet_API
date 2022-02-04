import { Router } from "express";
import { getRecord, insertRecord } from "../controlers/recordsController.js";
import validateRecordsSchema from "../midllewares/validateRecordsSchema.js";
import { validateToken } from "../midllewares/validateToken.js";

const recordsRouter = Router();

recordsRouter.use(validateToken);
recordsRouter.post("/records", validateRecordsSchema, insertRecord);
recordsRouter.get("/records", getRecord);

export default recordsRouter;