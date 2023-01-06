import { Controller, Get, Patch, Body, Param, Logger } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/schemas/group.schema';
import UpdateDeviceListDto from 'src/groups/dto/UpdateDeviceListDto';

@Controller('groups')
export class GroupsController {
  private readonly logger: Logger = new Logger(GroupsController.name);

  constructor(private readonly groupsService: GroupsService) {}
  @Get('/')
  async getAllGroups(): Promise<Group[]> {
    return await this.groupsService.getAllGroups();
  }

  @Patch('/list/:groupId')
  async updateGroupDeviceList(
    @Param() params: { groupId: string },
    @Body()
    body: UpdateDeviceListDto,
  ): Promise<Record<string, undefined>> {
    this.logger.debug('Update device list', params, body);

    await this.groupsService.updateGroupDevices(
      params.groupId,
      body.deviceList,
    );

    return {};
  }
}
