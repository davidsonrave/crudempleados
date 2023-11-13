import { Router } from "express";
const router = Router();
import {createEmpleado, getEmpleados, updateEmpleado, deleteEmpleado} from "../controllers/empleadosController.js"

router.post("/create", createEmpleado);
router.get("/empleados", getEmpleados);
router.put("/update", updateEmpleado);
router.delete("/delete/:id", deleteEmpleado);

export default router;
