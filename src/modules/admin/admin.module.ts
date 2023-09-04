import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminJwtStrategy} from 'src/strategy/jwt.strategy';
import { Repository } from 'typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity]),JwtModule,ConfigModule.forRoot()],
    controllers: [AdminController],
    providers: [AdminService,AdminJwtStrategy,Repository],
})
export class AdminModule {}
