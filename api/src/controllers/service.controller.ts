import { Company } from "@prisma/client"; // Adjust the import based on your schema
import { BaseController } from "./base.controller";
import { ServiceService } from "../services/service.service";

export class ServiceController extends BaseController<Company> {
  constructor() {
    super(new ServiceService());
  }
}