import { Router } from "express";
import { insertRecord } from "../controlers/recordsController.js";
import validateRecordsSchema from "../midllewares/validateRecordsSchema.js";

const recordsRouter = Router();
recordsRouter.post("/records", validateRecordsSchema, insertRecord);
export default recordsRouter;