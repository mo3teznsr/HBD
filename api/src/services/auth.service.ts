import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthService {
  async register(data:any) {
    console.log(data)
    const { email, password,firstName, lastName, company } = data;

    const oldUser= await prisma.user.findUnique({ where: { email } });
    if (oldUser) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    const {city,area,address,name}=company

    const userCompany =await prisma.company.create({ data: {
      name:JSON.stringify(company.name),
      address,
      city,
      area,
      
    } });
    const user= await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        companyId: userCompany.id,
      },
    });

    return this.login({ email, password });
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user };
  }

  async me(req:any){
    console.log(req.user)
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) throw new Error("User not found");
    delete user.password
    return user
  }
}

