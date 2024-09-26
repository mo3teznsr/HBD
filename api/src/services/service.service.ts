import { PrismaClient } from "@prisma/client";
import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";
export class ServiceService extends BaseService<any> {
  constructor() {
    super(prisma.service);
  }

  // Add any specific methods related to Company here
}