import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProjectRequestBody } from "../models/Project";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    orderBy: {
      id: "asc",
    },
  });
  res.json(projects);
});

router.post(
  "/",
  async (req: Request<{}, {}, ProjectRequestBody>, res: Response) => {
    const { src, alt, name, description, link, type } = req.body;
    const project = await prisma.project.create({
      data: { src, alt, name, description, link, type },
    });
    res.json(project);
  }
);

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { src, alt, name, description, link, type } =
    req.body as ProjectRequestBody;

  const projectId = parseInt(id);
  if (isNaN(projectId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { src, alt, name, description, link, type },
  });
  res.json(project);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  await prisma.project.delete({
    where: { id: projectId },
  });
  res.sendStatus(204);
});

export default router;
