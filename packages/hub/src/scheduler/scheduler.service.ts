import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  @Cron('* * * * *', {
    name: 'Blind Scheduler',
    timeZone: 'Europe/London',
  })
  processCron() {
    this.logger.log('Running Scheduler');
  }
}
