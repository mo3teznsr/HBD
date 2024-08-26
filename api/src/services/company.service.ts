import { Prisma, Company } from "@prisma/client";
import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";

export class CompanyService extends BaseService<typeof prisma.company, Company> {
  constructor() {
    super(prisma.company);
  }
}