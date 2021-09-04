import { Category } from './category.model';

export class CategoryRepository {
  private category: Category[];

  constructor() {
    this.category = [
      { id: 1, name: 'Macera' },
      { id: 2, name: 'Romantik' },
      { id: 3, name: 'Dram' },
      { id: 4, name: 'Bilim-Kurgu' },
    ];
  }

  getCategories(): Category[] {
    return this.category;
  }
}
