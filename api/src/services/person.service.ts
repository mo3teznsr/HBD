import { BaseService } from "./base.service";
import prisma from "../utils/prisma.util";
export class PersonService extends BaseService<any> {
  constructor() {
    super(prisma.person);
  }

  // Add any specific methods related to Company here
}