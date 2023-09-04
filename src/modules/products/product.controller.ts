import { Body, Controller, Get, Param, Post, UploadedFile , UseInterceptors, ValidationPipe , UseGuards, NotFoundException, Patch, Delete} from '@nestjs/common';
import { ProductService } from './product.service';
import {FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ProductDTO } from './dto/product.dto';
import { ResponseData } from 'src/golbal/golbalClass';
import { Product } from 'src/models/product.models';
import { HttpMessage } from 'src/golbal/golbalEnum';
import { HttpStatus } from 'src/golbal/golbalEnum';


@Controller('product')
export class ProductController {
    constructor(readonly productService:ProductService,
        
        ){}

    @Get()
    async list():Promise<any>{
        return await this.productService.getList()
    }

    @Get('/:id')
    async details(@Param('id') id:number):Promise<ResponseData<Product>>{
        return new ResponseData<Product>( await this.productService.getDetails(id),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
    }

    @UseGuards(AuthGuard('AdminStrategy'))
    @Post()
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: 'src/modules/products/uploads'
        })
    }))
    async create(@UploadedFile() file : Express.Multer.File,
    @Body(new ValidationPipe()) ProductDTO:ProductDTO):Promise<ResponseData<Product>>{
        if(!file){
            throw new NotFoundException(' Not Image File !')
        }
        return new ResponseData<Product>(await this.productService.create(file ,ProductDTO ),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
    
    }

    @UseGuards(AuthGuard('AdminStrategy'))
    @Patch('/:id')
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: 'src/modules/products/uploads'
        })
    }))
    async update(
    @Param('id') id : number ,
    @UploadedFile() file : Express.Multer.File,
    @Body(new ValidationPipe()) ProductDTO:ProductDTO,
    ):Promise<ResponseData<Product>>{
        if(!file){
            throw new NotFoundException(' Not Image File !')
        }
        return new ResponseData<Product>(await this.productService.update(id,file ,ProductDTO ),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
    }

    @UseGuards(AuthGuard('AdminStrategy'))
    @Delete('/:id')
    async delete(@Param('id') id: number):Promise<ResponseData<any>>{
        return new ResponseData<any>(await this.productService.delete(id),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
    }


    


  }

