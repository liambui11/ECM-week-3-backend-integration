import { IRepository } from '../../core/interfaces/repository.interface';
import  prisma from '../../core/database/prisma';
import { Product } from './product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductsQueryDto,
  ProductResponseDto,
} from './product.dto';
import { Prisma } from '@prisma/client';

export class ProductRepository implements IRepository<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  private buildWhereClause(q: GetProductsQueryDto): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {};
    if (q.categoryId) {
      where.categoryId = q.categoryId;
    }
    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: 'insensitive' } },
        { description: { contains: q.search, mode: 'insensitive' } },
      ];
    }
    if (q.minPrice !== undefined || q.maxPrice !== undefined) {
      where.price = { gte: q.minPrice, lte: q.maxPrice };
    }
    return where;
  }

  async findById(id: number): Promise<ProductResponseDto | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async findAll(
    q: GetProductsQueryDto
  ): Promise<{ items: ProductResponseDto[]; total: number }> {
    const where = this.buildWhereClause(q);
    const skip = (q.page - 1) * q.limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [q.sort]: q.order },
        skip,
        take: q.limit,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return { items: products, total };
  }

  async create(data: CreateProductDto): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.product.delete({
      where: { id },
    });
    return result !== null;
  }
}
