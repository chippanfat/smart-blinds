import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug'] });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: '*',
  });

  app.use(cookieParser());
  app.use(ClerkExpressRequireAuth());

  await app.listen(3001);
}
bootstrap();
