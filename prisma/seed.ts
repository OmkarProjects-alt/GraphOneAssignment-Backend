import { PrismaClient, CompanyStage, InvestorType, ProductCategory, FundingRoundType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // -----------------------------
  // CLEAN DB (optional but useful)
  // -----------------------------
  await prisma.companyNews.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.fundingRound.deleteMany();
  await prisma.product.deleteMany();
  await prisma.founder.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.investor.deleteMany();
  await prisma.company.deleteMany();

  // -----------------------------
  // COMPANIES (50+)
  // -----------------------------
  const companies = [];

  for (let i = 0; i < 50; i++) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        slug: faker.string.alphanumeric(10).toLowerCase(),
        description: faker.company.catchPhrase(),
        category: faker.helpers.arrayElement(["AI", "Fintech", "SaaS", "Health", "Ecommerce"]),
        fundingTotal: BigInt(faker.number.int({ min: 1000000, max: 5000000000 })),
        employeeCount: faker.number.int({ min: 10, max: 5000 }),
        foundedYear: faker.number.int({ min: 2000, max: 2024 }),
        hqCity: faker.location.city(),
        hqCountry: faker.location.country(),
        logoUrl: faker.image.url(),
        website: faker.internet.url(),
        stage: faker.helpers.arrayElement(Object.values(CompanyStage)),
        valuation: BigInt(faker.number.int({ min: 10000000, max: 100000000000 })),
        isUnicorn: faker.datatype.boolean(),
      },
    });

    companies.push(company);
  }

  // -----------------------------
  // INVESTORS (20+)
  // -----------------------------
  const investors = [];

  for (let i = 0; i < 20; i++) {
    const investor = await prisma.investor.create({
      data: {
        name: faker.person.fullName(),
        slug: faker.string.alphanumeric(10).toLowerCase(),
        type: faker.helpers.arrayElement(Object.values(InvestorType)),
        bio: faker.lorem.paragraph(),
        aum: BigInt(faker.number.int({ min: 10000000, max: 100000000000 })),
        portfolioCount: faker.number.int({ min: 5, max: 200 }),
        location: faker.location.country(),
        logoUrl: faker.image.avatar(),
        stageFocus: ["SEED", "SERIES_A"],
        sectorFocus: ["AI", "Fintech", "SaaS"],
      },
    });

    investors.push(investor);
  }

  // -----------------------------
  // FOUNDERS (1–2 per company)
  // -----------------------------
  for (const company of companies) {
    const founderCount = faker.number.int({ min: 1, max: 2 });

    for (let i = 0; i < founderCount; i++) {
      await prisma.founder.create({
        data: {
          name: faker.person.fullName(),
          slug: faker.string.alphanumeric(10).toLowerCase(),
          title: "Founder",
          bio: faker.lorem.paragraph(),
          twitter: faker.internet.url(),
          linkedin: faker.internet.url(),
          location: faker.location.city(),
          photoUrl: faker.image.avatar(),
          companyId: company.id,
        },
      });
    }
  }

  // -----------------------------
  // PRODUCTS (30+)
  // -----------------------------
  const products = [];

  for (let i = 0; i < 30; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.string.alphanumeric(10).toLowerCase(),
        description: faker.lorem.sentences(2),
        category: faker.helpers.arrayElement(Object.values(ProductCategory)),
        launchDate: faker.date.past(),
        upvotes: faker.number.int({ min: 0, max: 10000 }),
        websiteUrl: faker.internet.url(),
        companyId: faker.helpers.arrayElement(companies).id,
      },
    });

    products.push(product);
  }

  // -----------------------------
  // NEWS (100+)
  // -----------------------------
  const newsList = [];

  for (let i = 0; i < 100; i++) {
    const news = await prisma.newsArticle.create({
      data: {
        title: faker.lorem.sentence(),
        url: faker.internet.url(),
        source: faker.company.name(),
        tag: faker.helpers.arrayElement(["Funding", "AI", "Acquisition", "Launch"]),
        summary: faker.lorem.paragraph(),
        publishedAt: faker.date.recent({ days: 30 }),
      },
    });

    newsList.push(news);

    // link news to random company
    await prisma.companyNews.create({
      data: {
        companyId: faker.helpers.arrayElement(companies).id,
        newsId: news.id,
      },
    });
  }

  // -----------------------------
  // FUNDING ROUNDS
  // -----------------------------
  for (const company of companies) {
    await prisma.fundingRound.create({
      data: {
        roundType: faker.helpers.arrayElement(Object.values(FundingRoundType)),
        amount: BigInt(faker.number.int({ min: 1000000, max: 500000000 })),
        currency: "USD",
        date: faker.date.past(),
        companyId: company.id,
        leadInvestorId: faker.helpers.arrayElement(investors).id,
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });