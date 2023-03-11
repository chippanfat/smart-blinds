import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ControlController } from 'src/control/control.controller';
import { ControlService } from 'src/control/control.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/control/schemas/device.schema';
import { GroupSchema } from 'src/groups/schemas/group.schema';
import Device from 'src/control/dao/device';
import { HttpModule } from '@nestjs/axios';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [
    ConfigModule,
    QueueModule,
    MongooseModule.forFeature([
      { name: 'devices', schema: DeviceSchema },
      { name: 'groups', schema: GroupSchema },
    ]),
    HttpModule,
  ],
  controllers: [ControlController],
  providers: [QueueModule, ControlService, Device],
  exports: [QueueModule, Device],
})
export class ControlModule {}
