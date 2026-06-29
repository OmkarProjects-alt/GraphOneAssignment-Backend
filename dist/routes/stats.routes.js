import express from "express";
import { platformStats } from "../controllers/stats.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();
router.get("/", asyncHandler(platformStats));
export default router;
//# sourceMappingURL=stats.routes.js.map