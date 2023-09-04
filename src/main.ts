declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {v2 as cloudinary} from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.APP_PORT || 3000
  const host = process.env.APP_HOST 
  await app.listen(port , host , ()=>{
    console.log(`Server running at http://${host}:${port}`)
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  cloudinary.config({ 
    cloud_name: 'dyyvqq8pp', 
    api_key: '668525971469519', 
    api_secret: '3Neh3rXu2-7GuKtmKBhoBlgi2Qg' 
  });
  

 
  
  
}
bootstrap();
