import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { NotFoundError } from 'rxjs';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { Category } from 'src/models/categories.models';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';
import { ResponseData } from 'src/golbal/golbalClass';
import { Product } from 'src/models/product.models';
import { ImageService } from './cloudinary.service';

@Injectable()
export class ProductService {
    constructor (
        @InjectRepository(ProductsEntity)
    private productRepository : Repository<ProductsEntity>,
        @InjectRepository(CategoriesEntity)
        private categoryRepository : Repository<CategoriesEntity>,
        private imageService : ImageService

    ){}
    
    async getList():Promise<any>{
        return this.productRepository.find({relations:['category']})
    }

    async getDetails(id: number):Promise<any>{
        const IdExist = await this.productRepository.findOne({
            where : {id: id},
            relations:['category']
        })
        if(!IdExist){
            throw new NotFoundException(' Product Id Not Exist !')
        }
        return IdExist
    }
    async create(file:any , product : ProductDTO ): Promise<Product>{
        const categoryExists = await this.categoryRepository.findOne({where:{id:product.category_id}})
        if(!categoryExists){
            throw new NotFoundException(' Category Id Not Exists ! ')
        }
        product.price = Number(product.price)
        product.isActive = Boolean(product.isActive)
        const data ={
            ...product ,
            image : await this.imageService.uploadImage(file)

        }
        return await this.productRepository.save(data)
    }
    async update(id: number ,file:any ,Product:ProductDTO):Promise<any>{
        const productExists = await this.productRepository.findOne({where:{id:id}})
        if(!productExists){
            throw new NotFoundException('Not Found Product !')
        }
        const categoryExists = await this.categoryRepository.findOne({where:{id:Product.category_id}})
        if(!categoryExists){
            throw new NotFoundException('Not Found Categories ! ')
        }
        
        Product.price = Number(Product.price)
        Product.isActive = Boolean(Product.isActive)
        const data={
            ...Product,
            image : await this.imageService.uploadImage(file)
        }
       const Update =   await this.productRepository.update(id,data)
       if(!Update){
        throw new NotFoundException(' Update Faile !')
       }
       return { messager: 'Update Success !'}
    }
    async delete(id:number):Promise<any>{
        const ProductExists = await this.productRepository.findOne({where:{id:id}})
        if(!ProductExists){
            throw new NotFoundException('Product Not Exists !')
        }
        
        const Delete = await this.productRepository.delete(id)
        if(!Delete){
            throw new NotFoundException(' Delete Faile !')
        }
        return {messager: ' Delete Success !'}
    }
}
