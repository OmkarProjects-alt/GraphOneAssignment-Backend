import { prisma } from "../lib/prisma.js";

export const getFounderProfile = async (slug: string) => {
  return prisma.founder.findUnique({
    where: {
      slug,
    },

    include: {
      company: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
          category: true,
          stage: true,
          foundedYear: true,
          hqCity: true,
          hqCountry: true,
          website: true,
        },
      },
    },
  });
};