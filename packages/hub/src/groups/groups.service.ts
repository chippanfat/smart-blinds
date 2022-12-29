import { Injectable, Inject } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
import { Group } from 'src/groups/dao/group';
import { Group as GroupSchema } from 'src/groups/schemas/group.schema';

@Injectable()
export class GroupsService {
  constructor(private readonly group: Group) {}

  async getAllGroups(): Promise<GroupSchema[]> {
    return await this.group.getAll();
  }

  async updateGroupDevices(
    groupId: string,
    deviceList: string[],
  ): Promise<void> {
    await this.group.updateDeviceList(groupId, deviceList);
  }
}
