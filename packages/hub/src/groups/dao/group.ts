import { GroupDaoInterface } from 'src/groups/dao/group.dao.interface';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Group as GroupSchema } from 'src/groups/schemas/group.schema';
import { Logger } from '@nestjs/common';

export class Group implements GroupDaoInterface {
  private readonly logger: Logger = new Logger();

  constructor(
    @InjectModel('groups') private readonly groupModel: Model<GroupSchema>,
  ) {}
  async getAll(): Promise<GroupSchema[]> {
    return this.groupModel.find();
  }

  async updateDeviceList(groupId: string, deviceList: string[]): Promise<void> {
    const update = await this.groupModel.findOneAndUpdate(
      { _id: groupId },
      {
        $set: {
          devices: deviceList.map(
            (device) => new mongoose.Types.ObjectId(device),
          ),
        },
      },
    );

    this.logger.debug('Group update result', { update });
  }
}
