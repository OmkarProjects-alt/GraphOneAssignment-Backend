import { AppError } from "../utils/error.js";
import { getInvestors, getInvestorProfile, getMostActiveInvestors, getInvestorInvestments, } from "../services/investor.service.js";
import { getStringParam } from "../utils/safeParam.js";
import { serializeBigInt } from "../utils/bigint.js";
export const listInvestors = async (req, res) => {
    const result = await getInvestors(req.query);
    res.json({
        data: serializeBigInt(result.data),
        meta: result.meta,
        error: null,
    });
};
export const investorProfile = async (req, res) => {
    const slug = getStringParam(req, "slug");
    if (!slug) {
        throw new AppError("Invalid slug", 400, "BAD_REQUEST");
    }
    const data = await getInvestorProfile(slug);
    if (!data) {
        throw new AppError("Investor not found", 404, "NOT_FOUND");
    }
    res.json({
        data: serializeBigInt(data),
        meta: null,
        error: null,
    });
};
export const mostActive = async (req, res) => {
    const data = await getMostActiveInvestors();
    res.json({
        data: serializeBigInt(data),
        meta: null,
        error: null,
    });
};
export const investorInvestments = async (req, res) => {
    const slug = getStringParam(req, "slug");
    if (!slug) {
        throw new AppError("Invalid slug", 400, "BAD_REQUEST");
    }
    const result = await getInvestorInvestments(slug, req.query);
    if (!result) {
        throw new AppError("Investor not found", 404, "NOT_FOUND");
    }
    res.json({
        data: result.data,
        meta: result.meta,
        error: null,
    });
};
//# sourceMappingURL=investor.controller.js.map