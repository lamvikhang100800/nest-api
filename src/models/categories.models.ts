export class Category {
    id?: number;
    Category_name?: string;
    description?: string;
    isActive?: boolean;
  
    constructor({ id, Category_name, description , isActive }) {
      if (id !== undefined) this.id = id;
      if (Category_name !== undefined) this.Category_name = Category_name;
      if (description !== undefined) this.description = description;
      if (isActive !== undefined) this.isActive =isActive;
    }
  }
  