import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import templateRoutes from "./routes/templateRoutes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use("/projects", projectRoutes);
app.use("/templates", templateRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
