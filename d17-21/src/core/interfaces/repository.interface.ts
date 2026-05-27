export interface IRepository<T, CreateDto, UpdateDto> {
  findById(id: number): Promise<T | null>;
  findAll(filters?: unknown): Promise<T[] | { items: T[]; total: number }>;
  create(data: CreateDto): Promise<T>;
  update(id: number, data: UpdateDto): Promise<T>;
  delete(id: number): Promise<boolean>;
}
