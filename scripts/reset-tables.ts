import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetBirthdaySystem() {
  try {
    const result = await prisma.$transaction(async (transaction) => {
      // Delete every RSVP record
      const deletedRSVPs = await transaction.rSVP.deleteMany();

      // Reset all table allocations
      const resetTables = await transaction.birthdayTable.updateMany({
        data: {
          occupiedSeats: 0,
        },
      });

      return {
        deletedRSVPs: deletedRSVPs.count,
        resetTables: resetTables.count,
      };
    });

    console.log("======================================");
    console.log("Birthday RSVP system reset successfully");
    console.log("======================================");
    console.log(`Deleted RSVP records: ${result.deletedRSVPs}`);
    console.log(`Reset tables: ${result.resetTables}`);
    console.log("All tables are available again.");
  } catch (error) {
    console.error("Failed to reset birthday RSVP system:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

resetBirthdaySystem();