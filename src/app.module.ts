import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './entities/categories.entity';
import { ProductsEntity } from './entities/products.entity';
import { AdminEntity } from './entities/admin.entity';
import { AdminModule } from './modules/admin/admin.module';
import { ProductController } from './modules/products/product.controller';
import { ProductModule } from './modules/products/product.module';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_api',
    entities: [CategoriesEntity,ProductsEntity,AdminEntity],
    synchronize: true,
  }),
  
    CategoriesModule,
    AdminModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
