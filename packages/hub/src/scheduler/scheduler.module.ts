import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { SchedulerSchema } from 'src/scheduler/schemas/scheduler.schema';
import SchedulerDao from 'src/scheduler/dao/scheduler';
import { ControlService } from 'src/control/control.service';
import DeviceDao from 'src/control/dao/device';
import { DeviceSchema } from 'src/control/schemas/device.schema';
import { GroupSchema } from 'src/groups/schemas/group.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'devices', schema: DeviceSchema },
      { name: 'groups', schema: GroupSchema },
      { name: 'schedules', schema: SchedulerSchema },
    ]),
  ],
  providers: [ControlService, SchedulerService, SchedulerDao, DeviceDao],
})
export class SchedulerModule {}
