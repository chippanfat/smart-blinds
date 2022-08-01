import { Module } from '@nestjs/common';
import { ControlController } from './control.controller';
import { ControlService } from './control.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from '../schemas/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
