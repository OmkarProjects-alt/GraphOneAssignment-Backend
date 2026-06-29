import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(2).max(100),

  description: z.string().min(20),

  category: z.string().min(2),

  fundingTotal: z.number().nonnegative(),

  employeeCount: z.number().int().positive(),

  foundedYear: z
    .number()
    .min(1900)
    .max(new Date().getFullYear()),

  hqCity: z.string(),

  hqCountry: z.string(),

  website: z.string().url().optional(),

  logoUrl: z.string().url().optional(),

  valuation: z.number().nonnegative().optional(),

  isUnicorn: z.boolean().optional(),

  stage: z.enum([
    "PRE_SEED",
    "SEED",
    "SERIES_A",
    "SERIES_B",
    "SERIES_C",
    "SERIES_D",
    "IPO",
  ]),
});