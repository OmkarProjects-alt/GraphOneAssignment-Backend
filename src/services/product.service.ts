import { prisma } from "../lib/prisma";
import { getPagination } from "../utils/pagination";
import { AppError } from "../utils/error";

export const getProducts = async (query: any) => {

    const { category, sort } = query;

    const { page, limit, skip } = getPagination(query);

    const where = {
        ...(category && { category }),
    };

    const allowedSort = ["popular", "newest"] as const;

    if (sort && !allowedSort.includes(sort)) {
        throw new AppError(
            "Invalid sort value",
            400,
            "BAD_REQUEST"
        );
    }

    const orderBy =
        sort === "popular"
            ? { upvotes: "desc" as const }
            : { launchDate: "desc" as const };

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy,
            skip,
            take: limit,

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
        }),

        prisma.product.count({
            where,
        }),
    ]);

    return {
        data: products,

        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        },
    };
};

export const getProductBySlug = async (slug: string) => {

    const product = await prisma.product.findUnique({

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
                website: true,
                },
            },
        }
    });


    if(!product) return null;

    await prisma.product.update({
        where: { slug },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    });

    return product;

};