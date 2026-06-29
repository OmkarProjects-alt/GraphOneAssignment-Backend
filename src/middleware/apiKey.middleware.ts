import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";

export const requireApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const apiKey = req.header("API_KEY");

  if (!apiKey) {
    throw new AppError(
      "API key required",
      401,
      "UNAUTHORIZED"
    );
  }

  if (apiKey !== process.env.API_KEY) {
    throw new AppError(
      "Invalid API key",
      401,
      "UNAUTHORIZED"
    );
  }

  next();
};