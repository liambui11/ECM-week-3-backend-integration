import { IRepository } from '../../core/interfaces/repository.interface';
import  prisma  from '../../core/database/prisma';
import { Category } from './category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
} from './category.dto';

export class CategoryRepository implements IRepository<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  async findById(id: number): Promise<CategoryResponseDto | null> {
    return prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.category.delete({
      where: { id },
    });
    return result !== null;
  }
}
