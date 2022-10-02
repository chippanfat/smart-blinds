import { Injectable } from '@nestjs/common';
import { DaoInterface } from 'src/control/dao/dao.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device as ControlDevice } from 'src/control/schemas/device.schema';
import { Group as ControlGroup } from 'src/control/schemas/group.schema';
import InvalidDeviceException from 'src/control/errors/InvalidDeviceException';
import InvalidGroupException from 'src/control/errors/InvalidGroupException';

@Injectable()
export default class Device implements DaoInterface {
  constructor(
    @InjectModel('devices') private deviceModel: Model<ControlDevice>,
    @InjectModel('groups') private groupModel: Model<ControlGroup>,
  ) {}

  async getByName(name: string): Promise<ControlDevice> {
    const device = await this.deviceModel.findOne({ name });

    if (!device) {
      throw new InvalidDeviceException();
    }

    return device;
  }

  async updateDeviceState(name: string, state: boolean): Promise<void> {
    await this.deviceModel.findOneAndUpdate({ name }, { $set: { state } });
  }

  async getAllByGroup(name: string): Promise<ControlDevice[]> {
    const group = await this.groupModel.findOne({ name });

    if (!group) {
      throw new InvalidGroupException();
    }

    return this.deviceModel.find({ _id: { $in: group.devices } });
  }

  async getAllDevicesByGroupIds(ids: string[]): Promise<ControlDevice[]> {
    const groups = await this.groupModel.find({ _id: { $in: ids } });

    if (!groups) {
      throw new InvalidGroupException();
    }

    const groupDevices = groups.flatMap((group) => group.devices);

    return this.deviceModel.find({ _id: { $in: groupDevices } });
  }

  async getGroupsById(id: string[]): Promise<ControlGroup[]> {
    const group = await this.groupModel.find({ _id: id });

    if (!group) {
      throw new InvalidGroupException();
    }

    return group;
  }
}
