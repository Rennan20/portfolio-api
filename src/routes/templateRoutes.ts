import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TemplateRequestBody } from "../models/Template";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const templates = await prisma.template.findMany();
  res.json(templates);
});

router.post(
  "/",
  async (req: Request<{}, {}, TemplateRequestBody>, res: Response) => {
    const { src, alt, name, description, link, type } = req.body;
    const template = await prisma.template.create({
      data: { src, alt, name, description, link, type },
    });
    res.json(template);
  }
);

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { src, alt, name, description, link, type } =
    req.body as TemplateRequestBody;

  const templateId = parseInt(id);
  if (isNaN(templateId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  const template = await prisma.template.update({
    where: { id: templateId },
    data: { src, alt, name, description, link, type },
  });
  res.json(template);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const templateId = parseInt(id);

  if (isNaN(templateId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  await prisma.template.delete({
    where: { id: templateId },
  });
  res.sendStatus(204);
});

export default router;
