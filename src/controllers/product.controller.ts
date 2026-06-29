import type { Request, Response } from "express";
import { AppError } from "../utils/error.js";
import { getProducts, getProductBySlug } from "../services/product.service.js";
import { getStringParam } from "../utils/safeParam.js";

export const listProducts = async (
    req: Request,
    res: Response
) => {

    const result = await getProducts(req.query);

    res.json({
        data: result.data,
        meta: result.meta,
        error: null,
    });

};

export const productProfile = async (
    req: Request,
    res: Response
) => {

    const slug = getStringParam(req, "slug");

    if(!slug) {
        throw new AppError("Invalid slug", 400, "BAD_REQUEST")
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "NOT_FOUND"
        );
    }

    res.json({
        data: product,
        meta: null,
        error: null,
    });

};