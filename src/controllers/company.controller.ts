import type { Request, Response } from "express";
import {
  fetchCompanies,
  fetchCompanyBySlug,
  createCompany,
  getTrendingCompanies,
  getCompanyFunding,
  getCompanyProducts,
} from "../services/company.service.js";
import { AppError } from "../utils/error.js";
import { getStringParam } from "../utils/safeParam.js";
import { serializeBigInt } from "../utils/bigint.js";
import { createCompanySchema } from "../validators/company.validator.js";

export const getCompanies = async (req: Request, res: Response) => {
  const result = await fetchCompanies(req.query);

  res.json({
    data: serializeBigInt(result.data),
    meta: result.meta,
    error: null,
  });
};

export const getCompanyBySlug = async (req: Request, res: Response) => {
  const slug = getStringParam(req, "slug");

  if (!slug) {
    throw new AppError("Invalid slug", 400, "BAD_REQUEST");
  }

  const data = await fetchCompanyBySlug(slug);

  if (!data) {
    throw new AppError("Company not found", 404, "NOT_FOUND");
  }

  console.log(data);

  res.json({
    data: serializeBigInt(data),
    meta: null,
    error: null,
  });
};


export const addCompany = async (
  req: Request,
  res: Response
) => {

  const body = createCompanySchema.parse(req.body);

  const company = await createCompany(body);

  res.status(201).json({
    data: serializeBigInt(company),
    meta: null,
    error: null,
  });

};

export const trendingCompanies = async (req: Request, res: Response) => {
  const data = await getTrendingCompanies();

  res.json({
    data: serializeBigInt(data),
    meta: null,
    error: null,
  });
};

export const companyFunding = async (req: Request, res: Response) => {
  const slug = getStringParam(req, "slug");

  if (!slug) {
    throw new AppError("Invalid slug", 400, "BAD_REQUEST");
  }

  const data = await getCompanyFunding(slug);

  if (!data) {
    throw new AppError("Company not found", 404, "NOT_FOUND");
  }

  res.json({
    data: serializeBigInt(data),
    meta: null,
    error: null,
  });
};

export const companyProducts = async (req: Request, res: Response) => {
  const slug = getStringParam(req, "slug");

  if (!slug) {
    throw new AppError("Invalid slug", 400, "BAD_REQUEST");
  }

  const data = await getCompanyProducts(slug);

  if (!data) {
    throw new AppError("Company not found", 404, "NOT_FOUND");
  }

  res.json({
    data,
    meta: null,
    error: null,
  });
};
