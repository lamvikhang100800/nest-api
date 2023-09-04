import { Controller, Get, Param , Post , Patch , Delete, Body, ValidationPipe} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ResponseData } from 'src/golbal/golbalClass';
import { Category } from 'src/models/categories.models';
import { HttpMessage, HttpStatus } from 'src/golbal/golbalEnum';
import { CategoryDTO } from './dto/categories.dto';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Get()
  async list(): Promise<ResponseData<Category[]>> {
    return new ResponseData<Category[]>( await this.CategoriesService.getAll(),HttpStatus.SUCCESS ,HttpMessage.SUCCESS);
  }

  @Get('/:id')
  async detail(@Param('id') id : number ): Promise<ResponseData<Category>> {
    return new ResponseData<Category>( await this.CategoriesService.getById(id),HttpStatus.SUCCESS ,HttpMessage.SUCCESS);
  }

  @Post()
  async create(@Body(new ValidationPipe()) categoryDTO : CategoryDTO): Promise<ResponseData<any>>{
    return new ResponseData<Category>( await this.CategoriesService.create(categoryDTO),HttpStatus.SUCCESS ,HttpMessage.SUCCESS);

  }

  @Patch('/:id')
  async update(@Param('id') id : number , @Body(new ValidationPipe()) categoryDTO : CategoryDTO): Promise<ResponseData<any>>{
    return new ResponseData<any>(await this.CategoriesService.update(id,categoryDTO),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
  }

  @Delete('/:id')
  async delete(@Param('id') id: number):Promise<ResponseData<any>>{
    return  new ResponseData<any>(await this.CategoriesService.delete(id),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
  }
  }

