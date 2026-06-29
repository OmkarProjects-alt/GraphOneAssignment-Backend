import express from "express";
import { getCompanies, getCompanyBySlug, addCompany, trendingCompanies, companyFunding, companyProducts, } from "../controllers/company.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireApiKey } from "../middleware/apiKey.middleware.js";
const router = express.Router();
router.post("/", requireApiKey, asyncHandler(addCompany));
router.get("/", asyncHandler(getCompanies));
router.get("/trending", asyncHandler(trendingCompanies));
router.get("/:slug", asyncHandler(getCompanyBySlug));
router.get("/:slug/funding", asyncHandler(companyFunding));
router.get("/:slug/products", asyncHandler(companyProducts));
export default router;
//# sourceMappingURL=company.routes.js.map