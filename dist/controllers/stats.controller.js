import { getPlatformStats } from "../services/stats.service.js";
import { serializeBigInt } from "../utils/bigint.js";
export const platformStats = async (req, res) => {
    const data = await getPlatformStats();
    res.json({
        data: serializeBigInt(data),
        meta: null,
        error: null,
    });
};
//# sourceMappingURL=stats.controller.js.map