import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto, GetProductsQueryDto, ProductResponseDto } from './product.dto';

export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async getAllProducts(q: GetProductsQueryDto): Promise<{ items: ProductResponseDto[]; total: number }> {
    return this.productRepo.findAll(q);
  }

  async getProductById(id: number): Promise<ProductResponseDto | null> {
    return this.productRepo.findById(id);
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.productRepo.create(data);
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    return this.productRepo.update(id, data);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.productRepo.delete(id);
  }
}
