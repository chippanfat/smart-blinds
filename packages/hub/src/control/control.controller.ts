import { Controller, Patch } from '@nestjs/common';
import { ControlService } from 'control/control.service';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Patch()
  async update() {
    await this.controlService.changeDeviceState('living room', true);
  }
}
