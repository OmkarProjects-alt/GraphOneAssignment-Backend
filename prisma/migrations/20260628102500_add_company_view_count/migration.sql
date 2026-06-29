-- AlterTable
ALTER TABLE "public"."Investor" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."NewsArticle" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;
