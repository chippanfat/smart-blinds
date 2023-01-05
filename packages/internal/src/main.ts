import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'internal/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: 'amqp://root:example@localhost:5672',
      queue: 'hub_queue',
      queueOptions: { durable: false },
    },
  });
  await app.listen();
}
bootstrap();
