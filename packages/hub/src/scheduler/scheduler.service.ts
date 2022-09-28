import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import SchedulerDao from 'src/scheduler/dao/scheduler';
import {Scheduler as Schedule} from 'src/scheduler/schemas/scheduler.schema';
import dayjs from 'dayjs';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly schedulerDao: SchedulerDao) {}

  @Cron('* * * * *', {
    name: 'Blind Scheduler',
    timeZone: 'Europe/London',
  })
  async processCron(): Promise<void> {
    this.logger.log('Running Scheduler');
    const schedules = await this.schedulerDao.getAllSchedules();

    for (const schedule of schedules) {
      this.logger.log('Running schedule', {'schedule': schedule.name})
      await this.processJob(schedule)
    }
  }

  async processJob(job: Schedule): Promise<void> {

    const shouldRun = dayjs().diff(job.last, 'minutes') <= 0;
    const hasStarted = dayjs().diff(job.start, 'minutes') >= 0;

    if (!shouldRun || !hasStarted) {
      return;
    }


    // console.log(currentDate.diff(lastRun));

  }

}
