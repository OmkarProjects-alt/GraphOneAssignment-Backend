import { prisma } from "../src/lib/prisma";

async function run() {
  await prisma.$executeRaw`
    UPDATE "Company"
    SET "searchVector" =
    to_tsvector('english', name || ' ' || description || ' ' || category);
  `;

  console.log("Search vector updated");
}

run()
  .catch(console.error)
  .finally(() => process.exit());