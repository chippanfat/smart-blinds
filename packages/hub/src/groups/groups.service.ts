import { Injectable } from '@nestjs/common';
import { Group } from 'src/groups/dao/group';
import { Group as GroupSchema } from 'src/groups/schemas/group.schema';

@Injectable()
export class GroupsService {
  constructor(private readonly group: Group) {}

  async getAllGroups(): Promise<GroupSchema[]> {
    return await this.group.getAll();
  }
}
