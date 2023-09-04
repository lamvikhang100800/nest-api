import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy }  from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from "passport-jwt"
import { stringify } from "querystring";
import { AdminEntity } from "src/entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy , 'AdminStrategy' ){
    constructor(public configService : ConfigService,
      @InjectRepository(AdminEntity)
           public adminRepository: Repository<AdminEntity>
      ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('JWT_SECRET')
        });
    }
      async validate(payload:{id: number , email: string , roles:string }){
        const roles = payload.roles
        if(roles != 'admin'){
          throw new UnauthorizedException('You are not admin !')
        }
      const account = await this.adminRepository.findOne({where : {id : payload.id}})
      delete account.password
      return account
    }
}
