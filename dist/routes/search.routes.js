import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { searchController, autocompleteController, trendingController } from '../controllers/search.controller.js';
const router = express.Router();
router.get("/", asyncHandler(searchController));
router.get("/autocomplete", asyncHandler(autocompleteController));
router.get('/trending', asyncHandler(trendingController));
export default router;
//# sourceMappingURL=search.routes.js.map