import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

  async updateScheduleLastRun(id: mongoose.Types.ObjectId, date: string | Date): Promise<void> {
    await this.schedulerModel.updateOne({_id: id}, {last: date});
  }
}
