import { Controller, Get } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Get('/')
  async getAllGroups(): Promise<void> {
    return await this.groupsService.getAllGroups();
  }
}
