import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { Model } from 'mongoose';

@Injectable()
export class ControlService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async changeDeviceState(id: string, state: boolean): Promise<void> {
    await this.deviceModel.findOneAndUpdate({ id }, { $set: { state } });
    // Do API request here to device
  }
}
