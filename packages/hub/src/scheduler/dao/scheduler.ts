import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scheduler as SchedulerModel } from 'src/scheduler/schemas/scheduler.schema';
import { SchedulerInterface } from 'src/scheduler/dao/dao.interface';

@Injectable()
export default class Scheduler implements SchedulerInterface {
  constructor(
    @InjectModel('schedules')
    private readonly schedulerModel: Model<SchedulerModel>,
  ) {}
  async getAllSchedules(): Promise<SchedulerModel[]> {
    return this.schedulerModel.find({ enabled: true });
  }
}
