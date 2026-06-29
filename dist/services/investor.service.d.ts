import type { Prisma } from "@prisma/client";
export declare const getInvestors: (query: any) => Promise<{
    data: {
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
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const getInvestorProfile: (slug: string) => Promise<({
    investments: ({
        company: {
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
        };
        fundingRound: {
            id: string;
            companyId: string;
            roundType: import("@prisma/client").$Enums.FundingRoundType;
            amount: bigint;
            currency: string;
            date: Date;
            leadInvestorId: string;
        };
    } & {
        id: string;
        companyId: string;
        investorId: string;
        fundingRoundId: string;
    })[];
    leadRounds: ({
        company: {
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
} & {
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
}) | null>;
export declare const getMostActiveInvestors: () => Prisma.PrismaPromise<{
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
}[]>;
export declare const getInvestorInvestments: (slug: string, query: any) => Promise<{
    data: ({
        company: {
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
        };
        fundingRound: {
            id: string;
            companyId: string;
            roundType: import("@prisma/client").$Enums.FundingRoundType;
            amount: bigint;
            currency: string;
            date: Date;
            leadInvestorId: string;
        };
    } & {
        id: string;
        companyId: string;
        investorId: string;
        fundingRoundId: string;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
    };
} | null>;
//# sourceMappingURL=investor.service.d.ts.map