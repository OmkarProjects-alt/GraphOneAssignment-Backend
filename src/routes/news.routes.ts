import express from "express";

import {
  listNews,
  trendingNews,
} from "../controllers/news.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(listNews)
);

router.get(
  "/trending",
  asyncHandler(trendingNews)
);

export default router;