import { Invoice } from "@prisma/client";
import { BaseController } from "./base.controller";
import { InvoiceService } from "../services/invoice.service";

export class InvoiceController extends BaseController<Invoice> {
  constructor() {
    super(new InvoiceService());
  }
}