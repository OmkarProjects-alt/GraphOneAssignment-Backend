import type { Request, Response } from "express";
import { AppError } from "../utils/error";
import {
  getInvestors,
  getInvestorProfile,
  getMostActiveInvestors,
  getInvestorInvestments,
} from "../services/investor.service";
import { getStringParam } from "../utils/safeParam";
import { serializeBigInt } from "../utils/bigint";

export const listInvestors = async (req: Request, res: Response) => {
  const result = await getInvestors(req.query);

  res.json({
    data: serializeBigInt(result.data),
    meta: result.meta,
    error: null,
  });
};

export const investorProfile = async (req: Request, res: Response) => {
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

export const mostActive = async (req: Request, res: Response) => {
  const data = await getMostActiveInvestors();

  res.json({
    data: serializeBigInt(data),
    meta: null,
    error: null,
  });
};

export const investorInvestments = async (req: Request, res: Response) => {
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
