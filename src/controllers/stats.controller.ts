import type { Request, Response } from "express";
import { getPlatformStats } from "../services/stats.service.js";
import { serializeBigInt } from "../utils/bigint.js";

export const platformStats = async (
  req: Request,
  res: Response
) => {
  const data = await getPlatformStats();

  res.json({
    data: serializeBigInt(data),
    meta: null,
    error: null,
  });
};