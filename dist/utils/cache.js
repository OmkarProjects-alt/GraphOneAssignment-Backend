import { redis } from "../lib/redis.js";
export const getCache = async (key) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch (err) {
        return null;
    }
};
export const setCache = async (key, value, ttl = 60) => {
    try {
        await redis.set(key, JSON.stringify(value), "EX", ttl);
    }
    catch {
    }
};
export const deleteCache = async (key) => {
    try {
        await redis.del(key);
    }
    catch {
    }
};
//# sourceMappingURL=cache.js.map