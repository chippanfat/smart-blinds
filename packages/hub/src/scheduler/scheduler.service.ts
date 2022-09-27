import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import SchedulerDao from 'src/scheduler/dao/scheduler';
import {Scheduler as Schedule} from 'src/scheduler/schemas/scheduler.schema';
import * as dayjs from 'dayjs';

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
    const currentDate = dayjs();

    console.log(job);
    // console.log(dayjs(job.last).diff(currentDate, 'minutes'));
    // console.log(dayjs(currentDate).diff(job.last, 'minute'));
  }

}
