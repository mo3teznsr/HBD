import { PrismaClient } from "@prisma/client";
import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";
export class OrderEmployeeService extends BaseService<any> {
  constructor() {
    super(prisma.orderEmployee);
  }

  // Add any specific methods related to Company here
}