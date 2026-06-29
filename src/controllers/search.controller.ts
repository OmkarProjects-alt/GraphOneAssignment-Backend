import type { Request, Response } from "express";
import { globalSearch, autocompleteSearch, getTrendingSearches } from "../services/search.service";
import { AppError } from "../utils/error";

export const searchController = async (req: Request, res: Response) => {
  const q = req.query.q as string;

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


export const autocompleteController = async (req: Request, res: Response) => {
  const q = req.query.q as string;

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


export const trendingController = async (req: Request, res: Response) => {
  const data = await getTrendingSearches();

  res.json({
    data,
    meta: null,
    error: null,
  });
};