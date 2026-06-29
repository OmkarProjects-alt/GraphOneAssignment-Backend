import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js";
import { listProducts, productProfile } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/',
    asyncHandler(listProducts)
)

router.get('/:slug',
    asyncHandler(productProfile)
)

export default router;