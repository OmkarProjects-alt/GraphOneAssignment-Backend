import { redis } from "../lib/redis";

export const getCache = async (key: string) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};

export const setCache = async (key: string, value: any, ttl = 60) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch {
  }
};

export const deleteCache = async (key: string) => {
  try {
    await redis.del(key);
  } catch {
  }
};