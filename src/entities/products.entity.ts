
import { Entity, Column, PrimaryGeneratedColumn , OneToOne , JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoriesEntity } from './categories.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_name: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  describe: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  category_id : number;
  
  @CreateDateColumn({
    type: 'datetime',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
      type: 'datetime',
      default: () => 'NOW()',
    })
  updatedAt: Date;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoriesEntity;
}