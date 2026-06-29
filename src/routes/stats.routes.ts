import express from "express";
import { platformStats } from "../controllers/stats.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(platformStats)
);

export default router;