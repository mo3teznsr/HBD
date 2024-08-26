import { PrismaClient } from "@prisma/client";
import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";
export class InvoiceService extends BaseService<any> {
  constructor() {
    super(prisma.invoice);
  }

  // Add any specific methods related to Company here
}