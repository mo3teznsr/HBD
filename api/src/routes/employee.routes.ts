import { Router } from "express";
import { EmployeeController } from "../controllers/emplyee.controller";


const router = Router();
const employeeController = new EmployeeController();

router.post("/", employeeController.create);
router.get("/", employeeController.findAll);
router.get("/:id", employeeController.findById);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.delete);

export default router;