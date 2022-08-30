import { Module } from '@nestjs/common';
import { ControlController } from 'control/control.controller';
import { ControlService } from 'control/control.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'control/schemas/device.schema';
import { GroupSchema } from 'control/schemas/group.schema';
import Device from 'control/dao/device';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'device', schema: DeviceSchema },
      { name: 'group', schema: GroupSchema },
    ]),
    HttpModule,
  ],
  controllers: [ControlController],
  providers: [ControlService, Device],
})
export class ControlModule {}
