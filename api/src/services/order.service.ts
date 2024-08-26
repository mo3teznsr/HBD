import { PrismaClient } from "@prisma/client";
import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";
export class OrderService extends BaseService<any> {
  constructor() {
    super(prisma.order);
  }

  // Add any specific methods related to Company here
}