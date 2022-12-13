import { GroupDaoInterface } from 'src/groups/dao/group.dao.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group as GroupSchema } from 'src/groups/schemas/group.schema';

export class Group implements GroupDaoInterface {
  constructor(
    @InjectModel('groups') private readonly groupModel: Model<GroupSchema>,
  ) {}
  async getAll(): Promise<GroupSchema[]> {
    return this.groupModel.find();
  }
}
