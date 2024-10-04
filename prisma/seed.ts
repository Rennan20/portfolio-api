import { PrismaClient } from "@prisma/client";
import { projects } from "../src/data/projects";
import { templates } from "../src/data/templates";

const prisma = new PrismaClient();

async function main() {
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  for (const template of templates) {
    await prisma.template.create({ data: template });
  }

  console.log("Projects and templates have been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
