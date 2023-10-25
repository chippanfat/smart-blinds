import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'internal/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: process.env.HUB_QUEUE_URL,
      queue: process.env.HUB_QUEUE_NAME,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
