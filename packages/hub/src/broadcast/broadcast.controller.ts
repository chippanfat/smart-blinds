import { Controller, Post, Logger } from '@nestjs/common';
import { BroadcastService } from 'src/broadcast/broadcast.service';

@Controller('broadcast')
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  @Post()
  async deviceBroadcast() {
    await this.broadcastService.sendBroadcastEvent();
  }
}
