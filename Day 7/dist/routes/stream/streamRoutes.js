import express from "express";
import { streamImageController, streamTextController, } from "../../controller/streamController.js";
export const streamRouter = express.Router();
streamRouter.get("/text", streamTextController);
streamRouter.get("/image", streamImageController);
//# sourceMappingURL=streamRoutes.js.map