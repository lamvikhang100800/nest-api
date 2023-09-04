
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { ProductsEntity } from './products.entity';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  Category_name: string;

  @Column()
  describe: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}