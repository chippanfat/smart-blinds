import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { SchedulerSchema } from 'src/scheduler/schemas/scheduler.schema';
import SchedulerDao from 'src/scheduler/dao/scheduler'
import {ControlService} from "src/control/control.service";

@Module({
  imports: [
    ControlService,
    MongooseModule.forFeature([{ name: 'schedules', schema: SchedulerSchema }]),
  ],
  providers: [ControlService, SchedulerService, SchedulerDao],
})
export class SchedulerModule {}
