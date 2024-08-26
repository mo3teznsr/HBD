import { Employee } from "@prisma/client";
import { BaseController } from "./base.controller";
import { EmployeeService } from "../services/employee.service";

export class EmployeeController extends BaseController<Employee> {
  constructor() {
    super(new EmployeeService());
  }
}