import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOTAL_TABLES = 15;
const SEATS_PER_TABLE = 4;

async function main() {
  // Remove any tables beyond table 15
  const deletedExtraTables = await prisma.birthdayTable.deleteMany({
    where: {
      tableNumber: {
        gt: TOTAL_TABLES,
      },
    },
  });

  console.log(
    `Deleted ${deletedExtraTables.count} extra table records.`
  );

  // Create or reset tables 1–15
  for (let tableNumber = 1; tableNumber <= TOTAL_TABLES; tableNumber++) {
    await prisma.birthdayTable.upsert({
      where: {
        tableNumber,
      },

      update: {
        capacity: SEATS_PER_TABLE,
        occupiedSeats: 0,
      },

      create: {
        tableNumber,
        capacity: SEATS_PER_TABLE,
        occupiedSeats: 0,
      },
    });
  }

  console.log(
    `${TOTAL_TABLES} birthday tables created/reset successfully.`
  );
}

main()
  .catch((error) => {
    console.error("Failed to seed birthday tables:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });