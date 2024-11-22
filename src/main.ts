import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs')
  app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
  }))

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
