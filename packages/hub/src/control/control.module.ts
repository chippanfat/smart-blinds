import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ControlController } from 'src/control/control.controller';
import { ControlService } from 'src/control/control.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/control/schemas/device.schema';
import { GroupSchema } from 'src/groups/schemas/group.schema';
import { ConfigService } from '@nestjs/config';
import Device from 'src/control/dao/device';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Clients } from 'src/types/clientsModule.enum';

@Module({
  imports: [
    ConfigModule,
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
              durable: false,
            },
          },
        }),
      },
    ]),
    MongooseModule.forFeature([
      { name: 'devices', schema: DeviceSchema },
      { name: 'groups', schema: GroupSchema },
    ]),
    HttpModule,
  ],
  controllers: [ControlController],
  providers: [ClientsModule, ControlService, Device],
  exports: [ClientsModule, Device],
})
export class ControlModule {}
