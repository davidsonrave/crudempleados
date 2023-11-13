import express from "express";

import cors from "cors";
import { PORT } from "./config.js";
const app = express();

import empleadosRoutes from "./routes/empleadosRoutes.js";

app.use(cors());
app.use(express.json());
app.use(empleadosRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
