import { Module } from '@nestjs/common';
import { AppController } from 'internal/app.controller';
import { AppService } from 'internal/app.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Clients } from 'internal/types/clientsModule.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Clients.AddressQueue,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://root:example@localhost:5672'],
          queue: 'address_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ClientsModule],
})
export class AppModule {}
