import express from "express";
import { founderProfile } from "../controllers/founder.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();
router.get("/:slug", asyncHandler(founderProfile));
export default router;
//# sourceMappingURL=founder.routes.js.map