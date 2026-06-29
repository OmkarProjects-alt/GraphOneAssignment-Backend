import { z } from "zod";
import { createCompanySchema } from "../validators/company.validator.js";
type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export declare const fetchCompanies: (query: any) => Promise<{
    data: {
        name: string;
        id: string;
        slug: string;
        description: string;
        category: string;
        fundingTotal: bigint;
        employeeCount: number;
        foundedYear: number;
        hqCity: string;
        hqCountry: string;
        logoUrl: string | null;
        website: string | null;
        stage: import("@prisma/client").$Enums.CompanyStage;
        valuation: bigint | null;
        isUnicorn: boolean;
        createdAt: Date;
        updatedAt: Date;
        searchVector: string | null;
        viewCount: number;
    }[];
    meta: {
        limit: number;
        total: number;
        page: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const fetchCompanyBySlug: (slug: string) => Promise<({
    founders: {
        name: string;
        id: string;
        slug: string;
        createdAt: Date;
        companyId: string;
        title: string;
        bio: string;
        twitter: string | null;
        linkedin: string | null;
        location: string | null;
        photoUrl: string | null;
    }[];
    fundingRounds: ({
        leadInvestor: {
            name: string;
            id: string;
            slug: string;
            logoUrl: string | null;
            createdAt: Date;
            viewCount: number;
            bio: string;
            location: string;
            type: import("@prisma/client").$Enums.InvestorType;
            aum: bigint | null;
            portfolioCount: number;
            stageFocus: string[];
            sectorFocus: string[];
        };
    } & {
        id: string;
        companyId: string;
        roundType: import("@prisma/client").$Enums.FundingRoundType;
        amount: bigint;
        currency: string;
        date: Date;
        leadInvestorId: string;
    })[];
    products: {
        name: string;
        id: string;
        slug: string;
        description: string;
        category: import("@prisma/client").$Enums.ProductCategory;
        createdAt: Date;
        viewCount: number;
        companyId: string;
        launchDate: Date | null;
        upvotes: number;
        websiteUrl: string | null;
    }[];
} & {
    name: string;
    id: string;
    slug: string;
    description: string;
    category: string;
    fundingTotal: bigint;
    employeeCount: number;
    foundedYear: number;
    hqCity: string;
    hqCountry: string;
    logoUrl: string | null;
    website: string | null;
    stage: import("@prisma/client").$Enums.CompanyStage;
    valuation: bigint | null;
    isUnicorn: boolean;
    createdAt: Date;
    updatedAt: Date;
    searchVector: string | null;
    viewCount: number;
}) | null>;
export declare const createCompany: (body: CreateCompanyInput) => Promise<{
    name: string;
    id: string;
    slug: string;
    description: string;
    category: string;
    fundingTotal: bigint;
    employeeCount: number;
    foundedYear: number;
    hqCity: string;
    hqCountry: string;
    logoUrl: string | null;
    website: string | null;
    stage: import("@prisma/client").$Enums.CompanyStage;
    valuation: bigint | null;
    isUnicorn: boolean;
    createdAt: Date;
}>;
export declare const getTrendingCompanies: () => Promise<{
    name: string;
    id: string;
    slug: string;
    description: string;
    category: string;
    fundingTotal: bigint;
    employeeCount: number;
    foundedYear: number;
    hqCity: string;
    hqCountry: string;
    logoUrl: string | null;
    website: string | null;
    stage: import("@prisma/client").$Enums.CompanyStage;
    valuation: bigint | null;
    isUnicorn: boolean;
    createdAt: Date;
    updatedAt: Date;
    searchVector: string | null;
    viewCount: number;
}[]>;
export declare const getCompanyFunding: (slug: string) => Promise<({
    investments: ({
        investor: {
            name: string;
            id: string;
            slug: string;
        };
    } & {
        id: string;
        companyId: string;
        investorId: string;
        fundingRoundId: string;
    })[];
    leadInvestor: {
        name: string;
        id: string;
        slug: string;
        logoUrl: string | null;
        type: import("@prisma/client").$Enums.InvestorType;
    };
} & {
    id: string;
    companyId: string;
    roundType: import("@prisma/client").$Enums.FundingRoundType;
    amount: bigint;
    currency: string;
    date: Date;
    leadInvestorId: string;
})[] | null>;
export declare const getCompanyProducts: (slug: string) => Promise<{
    name: string;
    id: string;
    slug: string;
    description: string;
    category: import("@prisma/client").$Enums.ProductCategory;
    createdAt: Date;
    viewCount: number;
    companyId: string;
    launchDate: Date | null;
    upvotes: number;
    websiteUrl: string | null;
}[] | null>;
export {};
//# sourceMappingURL=company.service.d.ts.map