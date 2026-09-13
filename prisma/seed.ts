import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let tableNumber = 1; tableNumber <= 30; tableNumber++) {
    await prisma.birthdayTable.upsert({
      where: {
        tableNumber,
      },
      update: {},
      create: {
        tableNumber,
        capacity: 6,
        occupiedSeats: 0,
      },
    });
  }

  console.log("30 birthday tables created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });