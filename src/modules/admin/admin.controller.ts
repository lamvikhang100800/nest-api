import { Body, Controller, Get, PayloadTooLargeException, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'typeorm';
import { registerDTO } from './dto/register.dto';
import { loginDTO } from './dto/login.dto';
import { ResponseData } from 'src/golbal/golbalClass';
import { HttpMessage } from 'src/golbal/golbalEnum';
import { HttpStatus } from 'src/golbal/golbalEnum';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { request } from 'http';



@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) registerDTO:registerDTO ): Promise<any>{
     return await  this.adminService.register(registerDTO);
  }
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDTO:loginDTO ):Promise<ResponseData<any>>{
    return new ResponseData<any>(await this.adminService.login(loginDTO),HttpStatus.SUCCESS,HttpMessage.SUCCESS)
  }

  @UseGuards(AuthGuard('AdminStrategy'))
  @Get()
  async gettoken(@Req() request:Request):Promise<any>{
    const user = request.user
    return await this.adminService.getToken(user)
  }
  
}
