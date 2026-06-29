import { prisma } from "../lib/prisma";
import { getCache, setCache } from "../utils/cache";

export const globalSearch = async (q: string) => {
  if (!q) return null;

  const cacheKey = `search:${q.toLowerCase().trim()}`;

  const cached = await getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const query = q.trim().replace(/ /g, " & ") + ":*";

  const [companies, investors, founders, products] = await Promise.all([
    prisma.$queryRaw`
      SELECT
        id, name, slug, category, "logoUrl",
        ts_rank(
          to_tsvector('english', name || ' ' || description || ' ' || category),
          to_tsquery('english', ${query})
        ) AS rank
      FROM "Company"
      WHERE to_tsvector('english', name || ' ' || description || ' ' || category)
      @@ to_tsquery('english', ${query})
      ORDER BY rank DESC
      LIMIT 5;
    `,

    prisma.$queryRaw`
      SELECT
        id, name, slug, type, "logoUrl",
        ts_rank(
          to_tsvector('english', name || ' ' || bio),
          to_tsquery('english', ${query})
        ) AS rank
      FROM "Investor"
      WHERE to_tsvector('english', name || ' ' || bio)
      @@ to_tsquery('english', ${query})
      ORDER BY rank DESC
      LIMIT 5;
    `,

    prisma.$queryRaw`
      SELECT
        id, name, slug, title, "photoUrl",
        ts_rank(
          to_tsvector('english', name || ' ' || title || ' ' || bio),
          to_tsquery('english', ${query})
        ) AS rank
      FROM "Founder"
      WHERE to_tsvector('english', name || ' ' || title || ' ' || bio)
      @@ to_tsquery('english', ${query})
      ORDER BY rank DESC
      LIMIT 5;
    `,

    prisma.$queryRaw`
      SELECT
        id, name, slug, category, "websiteUrl",
        ts_rank(
          to_tsvector('english', name || ' ' || description),
          to_tsquery('english', ${query})
        ) AS rank
      FROM "Product"
      WHERE to_tsvector('english', name || ' ' || description)
      @@ to_tsquery('english', ${query})
      ORDER BY rank DESC
      LIMIT 5;
    `,
  ]);

  const result = {
    companies,
    investors,
    founders,
    products,
  };

  await setCache(cacheKey, result, 300);

  return result;
};



export const autocompleteSearch = async (q: string) => {
  if (!q) return null;

  const query = q.trim();

  const cacheKey = `autocomplete:${q.toLowerCase().trim()}`;

  const cached = await getCache(cacheKey);

  if (cached) {
    return cached;
  }

  const [companies, investors, products] = await Promise.all([
    prisma.company.findMany({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        slug: true,
      },
      take: 5,
    }),

    prisma.investor.findMany({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        slug: true,
      },
      take: 5,
    }),

    prisma.product.findMany({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        slug: true,
      },
      take: 5,
    }),
  ]);

  const result = {
    companies: companies.map(c => c.name),
    investors: investors.map(i => i.name),
    products: products.map(p => p.name),
  };

  await setCache(cacheKey, result, 120);

  return result;
};



export const getTrendingSearches = async () => {

  const cacheKey = "trending-searches";

  const cached = await getCache(cacheKey);

  if (cached) {
    return cached;
  }

  const trending = await prisma.searchLog.groupBy({
    by: ["query"],
    _count: {
      query: true,
    },
    orderBy: {
      _count: {
        query: "desc",
      },
    },
    take: 10,
  });

  const result = trending.map(item => ({
    query: item.query,
    count: item._count.query,
  }));

  await setCache(cacheKey, result, 600);

  return result;
};