import { prisma } from "../lib/prisma.js";
import { getPagination } from "../utils/pagination.js";

export const getNews = async (query: any) => {
  const { tag } = query;

  const { page, limit, skip } = getPagination(query);

  const where = {
    ...(tag && { tag }),
  };

  const [news, total] = await Promise.all([
    prisma.newsArticle.findMany({
      where,
      skip,
      take: limit,

      include: {
        companies: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                slug: true,
                logoUrl: true,
              },
            },
          },
        },
      },

      orderBy: {
        publishedAt: "desc",
      },
    }),

    prisma.newsArticle.count({
      where,
    }),
  ]);

  return {
    data: news,

    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
    },
  };
};

export const getTrendingNews = async () => {

  return prisma.newsArticle.findMany({

    take: 10,

    orderBy: {
      viewCount: "desc",
    },

    include: {
        companies: {
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        },
    }
  })
};