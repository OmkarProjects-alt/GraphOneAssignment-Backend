export declare const getNews: (query: any) => Promise<{
    data: ({
        companies: ({
            company: {
                name: string;
                id: string;
                slug: string;
                logoUrl: string | null;
            };
        } & {
            companyId: string;
            newsId: string;
        })[];
    } & {
        id: string;
        viewCount: number;
        title: string;
        url: string;
        source: string;
        tag: string;
        summary: string;
        publishedAt: Date;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
    };
}>;
export declare const getTrendingNews: () => Promise<({
    companies: ({
        company: {
            name: string;
            id: string;
            slug: string;
        };
    } & {
        companyId: string;
        newsId: string;
    })[];
} & {
    id: string;
    viewCount: number;
    title: string;
    url: string;
    source: string;
    tag: string;
    summary: string;
    publishedAt: Date;
})[]>;
//# sourceMappingURL=news.service.d.ts.map