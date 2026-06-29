import { prisma } from "../lib/prisma";
import type { Prisma } from "@prisma/client";
import { getPagination } from "../utils/pagination";

export const getInvestors = async (query: any) => {
    const { type, location, stageFocus } = query;
    const { page, limit, skip } = getPagination(query);

    
    const where: Prisma.InvestorWhereInput = {
        ...(type ? { type } : {}),
        ...(location ? { location: { contains: location, mode: "insensitive" } } : {} ),
    }

    const [data, total] = await Promise.all([
        prisma.investor.findMany({
            where,
            skip: Number(skip),
            take: limit,
        }),

        prisma.investor.count({
            where,
        }),
    ])

    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        }
    }
};


export const getInvestorProfile = async (slug: string) => {
    const investor = await prisma.investor.findUnique({
        where: { slug },

        include: {
            investments: {
                include: {
                    company: true,
                    fundingRound: true,
                }
            },

            leadRounds: {
                include: {
                    company: true,
                }
            }
        }
    });

    if(!investor) {
        return null
    }

    await prisma.investor.update({
        where: { slug },
        data: {
            viewCount: {
                increment: 1,
            },
        }
    })

    return investor
};

export const getMostActiveInvestors = () => {
    return prisma.investor.findMany({
        orderBy: {
            portfolioCount: "desc",
        },
        take: 10,
    });
};


export const getInvestorInvestments = async (
  slug: string,
  query: any
) => {

  const investor = await prisma.investor.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (!investor) return null;

  const { page, limit, skip } = getPagination(query);

  const where = {
    investorId: investor.id,
  };

  const [data, total] = await Promise.all([

    prisma.investment.findMany({

      where,

      skip,
      take: limit,

      include: {

        company: true,

        fundingRound: true,

      },

      orderBy: {

        fundingRound: {

          date: "desc",

        },

      },

    }),

    prisma.investment.count({
      where,
    }),

  ]);

  return {

    data,

    meta: {

      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,

    },

  };

};