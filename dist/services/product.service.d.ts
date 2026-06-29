export declare const getProducts: (query: any) => Promise<{
    data: ({
        company: {
            name: string;
            id: string;
            slug: string;
            logoUrl: string | null;
        };
    } & {
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
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
    };
}>;
export declare const getProductBySlug: (slug: string) => Promise<({
    company: {
        name: string;
        id: string;
        slug: string;
        logoUrl: string | null;
        website: string | null;
    };
} & {
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
}) | null>;
//# sourceMappingURL=product.service.d.ts.map