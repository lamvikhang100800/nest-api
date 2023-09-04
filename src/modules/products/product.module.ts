import { Module } from '@nestjs/common';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/entities/products.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ImageService } from './cloudinary.service';


@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity,ProductsEntity])],
  controllers: [ProductController],
  providers: [ProductService,ImageService],
})
export class ProductModule {}
