"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importando Request e Response
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
// Rota para obter todos os projetos
app.get("/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma.project.findMany();
    res.json(projects);
}));
// Rota para adicionar um novo projeto
app.post("/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { src, alt, name, description, link, type } = req.body;
    const project = yield prisma.project.create({
        data: { src, alt, name, description, link, type },
    });
    res.json(project);
}));
// Rota para editar um projeto
app.put("/projects/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { src, alt, name, description, link, type } = req.body;
    // Adicionando verificação para garantir que o id é um número
    const projectId = parseInt(id);
    if (isNaN(projectId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }
    const project = yield prisma.project.update({
        where: { id: projectId },
        data: { src, alt, name, description, link, type },
    });
    res.json(project);
}));
// Rota para excluir um projeto
app.delete("/projects/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const projectId = parseInt(id);
    // Adicionando verificação para garantir que o id é um número
    if (isNaN(projectId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }
    yield prisma.project.delete({
        where: { id: projectId },
    });
    res.sendStatus(204);
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
