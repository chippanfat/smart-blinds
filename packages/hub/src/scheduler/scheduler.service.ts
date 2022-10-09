import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import SchedulerDao from 'src/scheduler/dao/scheduler';
import { Scheduler as Schedule } from 'src/scheduler/schemas/scheduler.schema';
import dayjs, { ManipulateType } from 'dayjs';
import { ControlService } from 'src/control/control.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly schedulerDao: SchedulerDao,
    private readonly controlService: ControlService,
  ) {}

  @Cron('* * * * *', {
    name: 'Blind Scheduler',
    timeZone: 'Europe/London',
  })
  async processCron(): Promise<void> {
    this.logger.log('Running Scheduler');
    const schedules = await this.schedulerDao.getAllSchedules();

    for (const schedule of schedules) {
      this.logger.log('Running schedule', { schedule: schedule.name });
      await this.processJob(schedule);
    }
  }

  async processJob(job: Schedule): Promise<void> {
    const shouldRun = dayjs().diff(job.last, 'minutes') <= 0;
    const hasStarted = dayjs().diff(job.start, 'minutes') >= 0;

    const { enabled, devices, when, state } = job;

    if (!shouldRun || !hasStarted || !enabled) {
      this.logger.log('Job should not run', {
        name: job.name,
        conditions: { shouldRun, hasStarted, enabled: job.enabled },
      });
      return;
    }

    const groups = await this.controlService.getGroupsById(
      devices.group.map((item) => item.toString()),
    );

    for (const group of groups) {
      await this.controlService.changeGroupState(group.name, state);
    }

    const nextRun = this.getNextRunDate(job);
    await this.schedulerDao.updateScheduleLastRun(job._id, nextRun);
  }

  getNextRunDate(job: Schedule): string {
    let format: { value: number; unit: ManipulateType } = {
      value: 1,
      unit: 'day',
    };
    switch (job.when) {
      case 'daily':
        format = { value: 1, unit: 'day' };
        break;
      case 'weekly':
        format = { value: 7, unit: 'day' };
        break;
      case 'monthly':
        format = { value: 1, unit: 'month' };
        break;
    }

    return dayjs(job.last)
      .add(format.value, format.unit)
      .format('YYYY-MM-DDTHH:mm:ss');
  }
}
