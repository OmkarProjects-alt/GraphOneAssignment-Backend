export declare const getFounderProfile: (slug: string) => Promise<({
    company: {
        name: string;
        id: string;
        slug: string;
        category: string;
        foundedYear: number;
        hqCity: string;
        hqCountry: string;
        logoUrl: string | null;
        website: string | null;
        stage: import("@prisma/client").$Enums.CompanyStage;
    };
} & {
    name: string;
    id: string;
    slug: string;
    createdAt: Date;
    companyId: string;
    title: string;
    bio: string;
    twitter: string | null;
    linkedin: string | null;
    location: string | null;
    photoUrl: string | null;
}) | null>;
//# sourceMappingURL=founder.service.d.ts.map