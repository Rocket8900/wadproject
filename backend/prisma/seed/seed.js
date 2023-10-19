import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const prisma = new PrismaClient();

// Get the URL of the current file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = dirname(__filename);

async function main() {
  // Construct the path to your JSON file
  const jsonPath = join(__dirname, "seed_data.json");

  // Read the file
  const jsonString = fs.readFileSync(jsonPath, "utf8");

  // Parse the JSON string to an object
  const instructors = JSON.parse(jsonString)["instructors"];

  // Use Prisma client to insert the data
  for (const instructor of instructors) {
    await prisma.instructor.create({
      data: instructor,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
