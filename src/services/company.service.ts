import { prisma } from "../lib/prisma";
import { buildCompanyFilters } from "../utils/companyFilters";
import { getPagination } from "../utils/pagination";
import { generateSlug } from "../utils/slug";
import { z } from "zod";
import { createCompanySchema } from "../validators/company.validator";

type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export const fetchCompanies = async (query: any) => {
    const { page, limit, skip } = getPagination(query);

    const where = buildCompanyFilters(query)

    const allowedSorts = ["funded", "new", "trending"] as const;

    const sort =
    allowedSorts.includes(query.sort)
        ? query.sort
        : "trending";

    const [data , total] = await Promise.all([
        prisma.company.findMany({
            where,
            orderBy:
                sort === "funded"
                    ? { fundingTotal: "desc" }
                    : sort === "new"
                    ? { foundedYear: "desc" }
                    : { viewCount: "desc" },

            skip,
            take: limit,
        }),

        prisma.company.count({
            where,
        })
    ])


    return {
        data,
        meta: {
            limit,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        }
    };
}

export const fetchCompanyBySlug = async (slug: string) => {

    const company = await prisma.company.findUnique({
        where: { slug },
        include: {
            founders: true,
            products: true,
            fundingRounds: {
                include: {
                    leadInvestor: true,
                },
            },
        },
    });

    if (!company) {
        return null;
    }

    await prisma.company.update({
        where: { slug },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    });

    return company;
};


export const createCompany = async (
  body: CreateCompanyInput
) => {
  const baseSlug = generateSlug(body.name);

  let slug = baseSlug;
  let count = 1;

  while (
    await prisma.company.findUnique({
      where: {
        slug,
      },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

    const companyData = {
        ...body,
        slug,
        logoUrl: body.logoUrl ?? null,
        website: body.website ?? null,
        valuation: body.valuation ?? null,
        isUnicorn: body.isUnicorn ?? false,
    };

    const company = await prisma.company.create({
      data: companyData,

      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        stage: true,
        fundingTotal: true,
        employeeCount: true,
        foundedYear: true,
        hqCity: true,
        hqCountry: true,
        logoUrl: true,
        website: true,
        valuation: true,
        isUnicorn: true,
        createdAt: true,
      },
    });

    return company;
};


export const getTrendingCompanies = async () => {
  return prisma.company.findMany({
    orderBy: {
      viewCount: "desc",
    },
    take: 10,
  });
};


export const getCompanyFunding = async (slug: string) => {
  const company = await prisma.company.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (!company) return null;

  return prisma.fundingRound.findMany({
    where: {
      companyId: company.id,
    },

    include: {
      leadInvestor: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
          type: true,
        },
      },

      investments: {
        include: {
          investor: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },

    orderBy: {
      date: "desc",
    },
  });
};


export const getCompanyProducts = async (slug: string) => {
    const company = await prisma.company.findUnique({
        where: { slug },
        
        select: {
            id: true,
        }
    });

    if(!company) return null;

    return await prisma.product.findMany({
        where: {
            companyId: company.id,
        },

        orderBy: {
            upvotes: "desc",
        },
    })
}