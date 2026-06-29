import express from "express";
import {
  listInvestors,
  investorProfile,
  mostActive,
  investorInvestments,
} from "../controllers/investor.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(listInvestors));

router.get("/most-active", asyncHandler(mostActive));

router.get("/:slug/investments", asyncHandler(investorInvestments));

router.get("/:slug", asyncHandler(investorProfile));

export default router;
