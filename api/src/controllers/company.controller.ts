import { Company } from "@prisma/client"; // Adjust the import based on your schema
import { BaseController } from "./base.controller";
import { CompanyService } from "../services/company.service";

export class CompanyController extends BaseController<Company> {
  constructor() {
    super(new CompanyService());
  }
}