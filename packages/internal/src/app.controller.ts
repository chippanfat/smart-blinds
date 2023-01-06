import { Controller } from '@nestjs/common';
import { AppService } from 'internal/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IStateChange } from 'internal/types/stateChange.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('state')
  async handleStateChange(@Payload() data: IStateChange): Promise<void> {
    await this.appService.doDeviceRequest(data);
  }
}
