
import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";
export class EmployeeService extends BaseService<any> {
  constructor() {
    super(prisma.employee);
  }

  // Add any specific methods related to Company here
}