import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { SchedulerSchema } from 'src/scheduler/schemas/scheduler.schema';
import SchedulerDao from 'src/scheduler/dao/scheduler';
import { ControlService } from 'src/control/control.service';
import DeviceDao from 'src/control/dao/device';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'schedules', schema: SchedulerSchema }]),
  ],
  providers: [ControlService, SchedulerService, SchedulerDao, DeviceDao],
})
export class SchedulerModule {}
