import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueService } from 'src/queue/queue.service';
import { Tokens } from 'src/types/tokens.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Tokens.RabbitMQ,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://root:example@localhost:5672'],
          queue: 'blinds_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
