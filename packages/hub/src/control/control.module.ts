import { Module } from '@nestjs/common';
import { ControlController } from 'src/control/control.controller';
import { ControlService } from 'src/control/control.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/control/schemas/device.schema';
import { GroupSchema } from 'src/groups/schemas/group.schema';
import Device from 'src/control/dao/device';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'devices', schema: DeviceSchema },
      { name: 'groups', schema: GroupSchema },
    ]),
    HttpModule,
  ],
  controllers: [ControlController],
  providers: [ControlService, Device],
  exports: [Device],
})
export class ControlModule {}
