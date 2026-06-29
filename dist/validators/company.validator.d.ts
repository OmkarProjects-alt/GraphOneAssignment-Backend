import { z } from "zod";
export declare const createCompanySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    fundingTotal: z.ZodNumber;
    employeeCount: z.ZodNumber;
    foundedYear: z.ZodNumber;
    hqCity: z.ZodString;
    hqCountry: z.ZodString;
    website: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    valuation: z.ZodOptional<z.ZodNumber>;
    isUnicorn: z.ZodOptional<z.ZodBoolean>;
    stage: z.ZodEnum<{
        PRE_SEED: "PRE_SEED";
        SEED: "SEED";
        SERIES_A: "SERIES_A";
        SERIES_B: "SERIES_B";
        SERIES_C: "SERIES_C";
        SERIES_D: "SERIES_D";
        IPO: "IPO";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=company.validator.d.ts.map