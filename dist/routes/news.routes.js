import express from "express";
import { listNews, trendingNews, } from "../controllers/news.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();
router.get("/", asyncHandler(listNews));
router.get("/trending", asyncHandler(trendingNews));
export default router;
//# sourceMappingURL=news.routes.js.map