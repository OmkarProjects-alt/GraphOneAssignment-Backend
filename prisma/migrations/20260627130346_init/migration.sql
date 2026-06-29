-- CreateEnum
CREATE TYPE "public"."CompanyStage" AS ENUM ('PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C', 'SERIES_D', 'IPO');

-- CreateEnum
CREATE TYPE "public"."InvestorType" AS ENUM ('VC', 'ANGEL', 'CORPORATE');

-- CreateEnum
CREATE TYPE "public"."FundingRoundType" AS ENUM ('PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C', 'SERIES_D', 'IPO');

-- CreateEnum
CREATE TYPE "public"."ProductCategory" AS ENUM ('CHAT', 'CODE', 'IMAGE', 'VIDEO', 'AUDIO', 'AGENT', 'SEARCH', 'PRODUCTIVITY', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fundingTotal" BIGINT NOT NULL,
    "employeeCount" INTEGER NOT NULL,
    "foundedYear" INTEGER NOT NULL,
    "hqCity" TEXT NOT NULL,
    "hqCountry" TEXT NOT NULL,
    "logoUrl" TEXT,
    "website" TEXT,
    "stage" "public"."CompanyStage" NOT NULL,
    "valuation" BIGINT,
    "isUnicorn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Founder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "twitter" TEXT,
    "linkedin" TEXT,
    "location" TEXT,
    "photoUrl" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Founder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."ProductCategory" NOT NULL,
    "launchDate" TIMESTAMP(3),
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "websiteUrl" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Investor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "public"."InvestorType" NOT NULL,
    "bio" TEXT NOT NULL,
    "aum" BIGINT,
    "portfolioCount" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL,
    "logoUrl" TEXT,
    "stageFocus" TEXT[],
    "sectorFocus" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FundingRound" (
    "id" TEXT NOT NULL,
    "roundType" "public"."FundingRoundType" NOT NULL,
    "amount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,
    "leadInvestorId" TEXT NOT NULL,

    CONSTRAINT "FundingRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Investment" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "fundingRoundId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyNews" (
    "companyId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "CompanyNews_pkey" PRIMARY KEY ("companyId","newsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "public"."Company"("slug");

-- CreateIndex
CREATE INDEX "Company_category_idx" ON "public"."Company"("category");

-- CreateIndex
CREATE INDEX "Company_stage_idx" ON "public"."Company"("stage");

-- CreateIndex
CREATE INDEX "Company_hqCountry_idx" ON "public"."Company"("hqCountry");

-- CreateIndex
CREATE UNIQUE INDEX "Founder_slug_key" ON "public"."Founder"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_slug_key" ON "public"."Investor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Investment_investorId_fundingRoundId_key" ON "public"."Investment"("investorId", "fundingRoundId");

-- AddForeignKey
ALTER TABLE "public"."Founder" ADD CONSTRAINT "Founder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FundingRound" ADD CONSTRAINT "FundingRound_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FundingRound" ADD CONSTRAINT "FundingRound_leadInvestorId_fkey" FOREIGN KEY ("leadInvestorId") REFERENCES "public"."Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "public"."Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_fundingRoundId_fkey" FOREIGN KEY ("fundingRoundId") REFERENCES "public"."FundingRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyNews" ADD CONSTRAINT "CompanyNews_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyNews" ADD CONSTRAINT "CompanyNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "public"."NewsArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
