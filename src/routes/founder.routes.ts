import express from "express";
import { founderProfile } from "../controllers/founder.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get(
  "/:slug",
  asyncHandler(founderProfile)
);

export default router;