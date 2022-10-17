import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueService } from './queue.service';
import { Tokens } from '../types/tokens.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Tokens.RabbitMQ,
        transport: Transport.RMQ,
        options: { urls: ['amqp://localhost'], queue: 'smart-blinds-queue' },
      },
    ]),
  ],
  controllers: [],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
