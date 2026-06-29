import type { Request, Response } from "express";
import { AppError } from "../utils/error.js";
import { getStringParam } from "../utils/safeParam.js";
import { getFounderProfile } from "../services/founder.service.js";

export const founderProfile = async (
  req: Request,
  res: Response
) => {
  const slug = getStringParam(req, "slug");

  if (!slug) {
    throw new AppError(
      "Invalid founder slug",
      400,
      "BAD_REQUEST"
    );
  }

  const founder = await getFounderProfile(slug);

  if (!founder) {
    throw new AppError(
      "Founder not found",
      404,
      "NOT_FOUND"
    );
  }

  res.json({
    data: founder,
    meta: null,
    error: null,
  });
};