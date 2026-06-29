import { AppError } from "../utils/error.js";
export const requireApiKey = (req, res, next) => {
    const apiKey = req.header("API_KEY");
    if (!apiKey) {
        throw new AppError("API key required", 401, "UNAUTHORIZED");
    }
    if (apiKey !== process.env.API_KEY) {
        throw new AppError("Invalid API key", 401, "UNAUTHORIZED");
    }
    next();
};
//# sourceMappingURL=apiKey.middleware.js.map