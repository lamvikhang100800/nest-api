import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { Category } from 'src/models/categories.models';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoriesEntity)
  private categoryRepository: Repository<CategoriesEntity>,
  @InjectRepository(ProductsEntity)
  private productRepository: Repository<ProductsEntity>
  ){}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getById(id : number): Promise<Category> {
    const result = await this.categoryRepository.findOne({where :{id}});
    if(!result){
      throw new NotFoundException('Not Found Categories !')
    }
    return result
  }

  async create(category : Category): Promise<any>{
    const productExist = await this.categoryRepository.findOne({where : {Category_name : String(category.Category_name) }})
    if(productExist){
      throw new ConflictException('Category name already exists! ')
    }
    return this.categoryRepository.save(category)
  }

  async update(id: number , category : Category): Promise<any>{
    const productExist = await this.categoryRepository.findOne({where:{id}})
    if(!productExist){
      throw new NotFoundException('Not Found Category To Update !')
    }

    const updateCategory = this.categoryRepository.update(id,category)
    if(!updateCategory){
      throw new InternalServerErrorException('Update Faile !')
    }
    return updateCategory
  }

  async delete(id:number): Promise<any>{
    const CategoriesExist = await this.categoryRepository.findOne({where:{id}})
    if(!CategoriesExist){
      throw new NotFoundException('Not Found Category To Delete ! ')
    }
    await this.productRepository.delete({category_id : id});
    return await this.categoryRepository.delete(id);

  }

}
