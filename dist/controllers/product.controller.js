import { AppError } from "../utils/error.js";
import { getProducts, getProductBySlug } from "../services/product.service.js";
import { getStringParam } from "../utils/safeParam.js";
export const listProducts = async (req, res) => {
    const result = await getProducts(req.query);
    res.json({
        data: result.data,
        meta: result.meta,
        error: null,
    });
};
export const productProfile = async (req, res) => {
    const slug = getStringParam(req, "slug");
    if (!slug) {
        throw new AppError("Invalid slug", 400, "BAD_REQUEST");
    }
    const product = await getProductBySlug(slug);
    if (!product) {
        throw new AppError("Product not found", 404, "NOT_FOUND");
    }
    res.json({
        data: product,
        meta: null,
        error: null,
    });
};
//# sourceMappingURL=product.controller.js.map