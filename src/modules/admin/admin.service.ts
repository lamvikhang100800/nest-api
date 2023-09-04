import { Injectable, NotFoundException } from '@nestjs/common';
import { promises } from 'dns';
import { Admin } from 'typeorm';
import { registerDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { request } from 'http';


@Injectable()

export class AdminService {
  constructor(@InjectRepository(AdminEntity,)
  private adminRepository: Repository<AdminEntity>,
  private readonly JwtService:JwtService,
  private ConfigService:ConfigService
  ){}

  async signJwtToken(userId: number , email: string , roles: string ):Promise<{accessToken:string}>{
    const payload = {
      sub: userId ,
      email : email,
      roles : roles
    }
    const JwtString = await this.JwtService.signAsync(payload,{
      expiresIn : '10m',
      secret : this.ConfigService.get('JWT_SECRET')
    })
     return { accessToken : JwtString }
  }

  async register(registerDTO : registerDTO): Promise<any> {
    const hashedPassword = await bcrypt.hash(registerDTO.password ,10)
    registerDTO.password = hashedPassword
    const result =  await this.adminRepository.save(registerDTO)
    return  {messager : 'Register Success !'}
  }
  
  async login(loginDTO : loginDTO ):Promise<any>{
    const acount = await this.adminRepository.findOne({where:{email : loginDTO.email}})
    if(!acount){
      throw new NotFoundException(' Email does not exist! ')
    }
    const result = await bcrypt.compare(loginDTO.password,acount.password)
    if(result != true ){
      throw new NotFoundException('Incorrect password !')
    }
    return await this.signJwtToken(acount.id,acount.email,acount.roles)
  }

  async getToken( user : any ):Promise<any>{
    return user
  }


}
