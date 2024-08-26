import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.post("/", orderController.create);
router.get("/", orderController.findAll);
router.get("/:id", orderController.findById);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

export default router;