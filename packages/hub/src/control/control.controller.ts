import { Body, Controller, Get, Param, Patch, HttpCode } from '@nestjs/common';
import { ControlService } from 'src/control/control.service';
import UpdateDeviceStateDto from 'src/control/dto/UpdateDeviceStateDto';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Get('/devices')
  async getAllDevices() {
    return await this.controlService.getAllDevices();
  }

  @Patch('/device/:deviceId')
  @HttpCode(204)
  async updateDevice(
    @Param() params: { deviceId: string },
    @Body() body: UpdateDeviceStateDto,
  ): Promise<Record<any, any>> {
    await this.controlService.changeState(params.deviceId, body.state);

    return {};
  }

  @Patch('/group')
  async updateGroup() {
    await this.controlService.changeGroupState('all', true);
  }
}
