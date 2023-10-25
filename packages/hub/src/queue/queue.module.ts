import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Clients } from 'src/types/clientsModule.enum';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: Clients.HubQueue,
        useFactory: async (configService: ConfigService) => ({
          name: Clients.HubQueue,
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('queue.url')],
            queue: configService.getOrThrow<string>('queue.name'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [ClientsModule],
  exports: [ClientsModule],
})
export class QueueModule {}
