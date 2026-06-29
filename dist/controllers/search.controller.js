import { globalSearch, autocompleteSearch, getTrendingSearches } from "../services/search.service.js";
import { AppError } from "../utils/error.js";
export const searchController = async (req, res) => {
    const q = req.query.q;
    if (!q) {
        throw new AppError("Query is required", 400, "BAD_REQUEST");
    }
    const data = await globalSearch(q);
    res.json({
        data,
        meta: null,
        error: null,
    });
};
export const autocompleteController = async (req, res) => {
    const q = req.query.q;
    if (!q) {
        throw new AppError("Query required", 400, "BAD_REQUEST");
    }
    const data = await autocompleteSearch(q);
    res.json({
        data,
        meta: null,
        error: null,
    });
};
export const trendingController = async (req, res) => {
    const data = await getTrendingSearches();
    res.json({
        data,
        meta: null,
        error: null,
    });
};
//# sourceMappingURL=search.controller.js.map