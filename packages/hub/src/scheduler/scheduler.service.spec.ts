import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import SchedulerDao from 'src/scheduler/dao/scheduler'
import { Scheduler as SchedulerInterface } from 'src/scheduler/schemas/scheduler.schema';
import mongoose from 'mongoose'

const offScheduleData: SchedulerInterface = {
  devices: {device: [], group: [new mongoose.Types.ObjectId()]},
  state: false,
  when: 'daily',
  start: ' 2022-09-13T00:12:00.000Z' as unknown as Date,
  last: ' 2022-09-13T00:12:00.000Z' as unknown as Date,
  enabled: true,
  name: 'Turn off devices'
}

const mockSchedulerDao = {
  getAllSchedules: () => Promise.resolve([offScheduleData])
};

describe('SchedulerService', () => {
  let service: SchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulerService, { provide: SchedulerDao, useValue: mockSchedulerDao}],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run the schedule function', () => {
    service.processCron();
  })
});
