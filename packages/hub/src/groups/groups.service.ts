import { Injectable } from '@nestjs/common';
import { Group } from 'src/groups/dao/group';

@Injectable()
export class GroupsService {
  constructor(private readonly group: Group) {}

  async getAllGroups(): Promise<void> {
    await this.group.getAll();
  }
}
