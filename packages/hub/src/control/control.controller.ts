import { Controller, Patch } from '@nestjs/common';
import { ControlService } from './control.service';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Patch()
  async update() {
    await this.controlService.changeDeviceState('', false);
  }
}
