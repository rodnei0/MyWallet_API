import { Router } from "express";
import { deleteRecord, getRecord, insertRecord, updateRecord } from "../controlers/recordsController.js";
import validateRecordsSchema from "../midllewares/validateRecordsSchema.js";
import { validateToken } from "../midllewares/validateToken.js";

const recordsRouter = Router();

recordsRouter.use(validateToken);
recordsRouter.post("/records", validateRecordsSchema, insertRecord);
recordsRouter.get("/records", getRecord);
recordsRouter.delete("/records/:id", deleteRecord);
recordsRouter.put("/records/:id", updateRecord);

export default recordsRouter;