import {Injectable} from '@nestjs/common'
import {DaoInterface} from "control/dao/dao.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Device as ControlDevice} from 'control/schemas/device.schema';
import InvalidDeviceException from "control/errors/InvalidDeviceException";

@Injectable()
export default class Device implements DaoInterface {
  constructor(@InjectModel('device') private deviceModel: Model<ControlDevice>) {
  }

  async getByName(name: string): Promise<ControlDevice> {
    const device = await this.deviceModel.findOne({name});

    if (!device) {
      throw new InvalidDeviceException();
    }

    return device;
  }

  async updateDeviceState(name: string, state: boolean): Promise<void> {
    await this.deviceModel.findOneAndUpdate({name}, {$set: {state}})
  }
}
