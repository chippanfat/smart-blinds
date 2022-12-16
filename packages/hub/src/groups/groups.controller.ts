import { Controller, Get } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/schemas/group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Get('/')
  async getAllGroups(): Promise<Group[]> {
    return await this.groupsService.getAllGroups();
  }
}
