import express from "express"
import { asyncHandler } from "../utils/asyncHandler";
import { listProducts, productProfile } from "../controllers/product.controller";

const router = express.Router();

router.get('/',
    asyncHandler(listProducts)
)

router.get('/:slug',
    asyncHandler(productProfile)
)

export default router;