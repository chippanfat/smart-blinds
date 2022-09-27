import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { SchedulerSchema } from 'src/scheduler/schemas/scheduler.schema';
import SchedulerDao from 'src/scheduler/dao/scheduler'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'schedules', schema: SchedulerSchema }]),
  ],
  providers: [SchedulerService, SchedulerDao],
})
export class SchedulerModule {}
