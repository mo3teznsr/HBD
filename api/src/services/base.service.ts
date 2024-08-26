import { PrismaClient, Prisma } from "@prisma/client";

export class BaseService<T> {
  constructor(private model: any) {}

  async create(data: T): Promise<T> {
    return this.model.create({ data }) as unknown as T;
  }

  async findAll(filters: Record<string, any> = {}, page: number = 1, pageSize: number = 10): Promise<T[]> {
    const skip = (page - 1) * pageSize;
    return this.model.findMany({
      where: filters,
      skip,
      take: pageSize,
    }) as unknown as T[];
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    }) as unknown as T | null;
  }

  async update(id: number, data: T): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    }) as unknown as T;
  }

  async delete(id: number): Promise<T> {
    return this.model.delete({
      where: { id },
    }) as unknown as T;
  }
}