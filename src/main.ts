import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session'
import { AllExceptionsFilter } from './filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setViewEngine('ejs')
  app.useGlobalPipes(new ValidationPipe())
  app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
  }))
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
