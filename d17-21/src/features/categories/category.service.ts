// Category Service encapsulating domain business logic (Rule #2: Functions <= 20 lines).

import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from './category.dto';

export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    return this.categoryRepo.findAll();
  }

  async getCategoryById(id: number): Promise<CategoryResponseDto | null> {
    return this.categoryRepo.findById(id);
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.categoryRepo.create(data);
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepo.update(id, data);
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepo.delete(id);
  }
}
