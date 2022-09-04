import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from './scheduler.service';
import { SchedulerSchema } from './schemas/scheduler.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'schedules', schema: SchedulerSchema }]),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
