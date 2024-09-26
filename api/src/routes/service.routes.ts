import { Router } from "express";
import { ServiceController } from "../controllers/service.controller";


const router = Router();
const serviceController = new ServiceController();

router.post("/", serviceController.create);
router.get("/", serviceController.findAll);
router.get("/:id", serviceController.findById);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

export default router;