import { Controller, Get } from '@nestjs/common';
import { QueueService } from 'src/queue/queue.service';

@Controller()
export class AppController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async getHello(): Promise<void> {
    await this.queueService.sendMessage();
  }
}
