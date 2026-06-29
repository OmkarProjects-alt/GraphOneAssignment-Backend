import { prisma } from "../lib/prisma.js";

export const getPlatformStats = async () => {
  const [
    companies,
    investors,
    founders,
    products,
    news,
    fundingRounds,
    funding,
  ] = await Promise.all([
    prisma.company.count(),
    prisma.investor.count(),
    prisma.founder.count(),
    prisma.product.count(),
    prisma.newsArticle.count(),
    prisma.fundingRound.count(),

    prisma.fundingRound.aggregate({
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    companies,
    investors,
    founders,
    products,
    news,
    fundingRounds,
    totalFunding: funding._sum.amount ?? BigInt(0),
  };
};