import express from "express";
import cors from "cors";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import templateRoutes from "./routes/templateRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://portfolio-five-xi-38.vercel.app",
      "http://localhost:3000",
    ],
  })
);

app.use("/projects", projectRoutes);
app.use("/templates", templateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
