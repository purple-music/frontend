import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // List of studios to ensure in the database
  const studios = [{ id: "purple" }, { id: "orange" }, { id: "blue" }];

  // Upsert each studio to avoid duplicates
  for (const studio of studios) {
    await prisma.studio.upsert({
      where: { id: studio.id },
      update: {}, // No update needed for existing records
      create: studio, // Create if the record doesn't exist
    });
  }

  console.log("Studios are seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
