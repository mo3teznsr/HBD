import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller";

const router = Router();
const invoiceController = new InvoiceController();

router.post("/", invoiceController.create);
router.get("/", invoiceController.findAll);
router.get("/:id", invoiceController.findById);
router.put("/:id", invoiceController.update);
router.delete("/:id", invoiceController.delete);

export default router;