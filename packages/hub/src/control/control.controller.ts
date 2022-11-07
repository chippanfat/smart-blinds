import { Controller, Get, Patch } from '@nestjs/common';
import { ControlService } from 'src/control/control.service';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Get('/devices')
  async getAllDevices() {
    return await this.controlService.getAllDevices();
  }

  @Patch('/device')
  async updateDevice() {
    await this.controlService.changeState('living room', true);
  }

  @Patch('/group')
  async updateGroup() {
    await this.controlService.changeGroupState('all', true);
  }
}
