import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import SchedulerDao from 'src/scheduler/dao/scheduler';
import { Scheduler as SchedulerInterface } from 'src/scheduler/schemas/scheduler.schema';
import { Device as DeviceInterface } from 'src/control/schemas/device.schema';
import { Group as GroupInterface } from 'src/groups/schemas/group.schema';
import { ControlService } from 'src/control/control.service';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { Groups } from 'src/types/groups.enum';

interface MockScheduleData extends SchedulerInterface {
  _id: mongoose.Types.ObjectId;
}

const offScheduleData: MockScheduleData = {
  _id: new mongoose.Types.ObjectId(),
  devices: { device: [], group: [new mongoose.Types.ObjectId()] },
  state: false,
  when: 'daily',
  start: '2022-09-10T00:00:00' as unknown as Date,
  last: '2022-09-13T18:31:00' as unknown as Date,
  enabled: true,
  name: 'Turn off devices',
};

const mockDeviceId = new mongoose.Types.ObjectId();

interface MockDeviceData extends DeviceInterface {
  _id: mongoose.Types.ObjectId;
}

const deviceData: MockDeviceData = {
  _id: mockDeviceId,
  address: '192.168.0.1',
  name: 'Living Room',
  state: true,
};

interface MockGroupData extends GroupInterface {
  _id: mongoose.Types.ObjectId;
}

const groupData: MockGroupData = {
  _id: new mongoose.Types.ObjectId(),
  devices: [mockDeviceId],
  name: Groups.All,
};

const mockSchedulerDao = {
  getAllSchedules: () => Promise.resolve([offScheduleData]),
  updateScheduleLastRun: () => Promise.resolve(),
};

const mockControlService = {
  changeGroupState: () => Promise.resolve(),
  getAllDevicesByGroupIds: () => [deviceData],
  getGroupsById: () => Promise.resolve([groupData]),
} as unknown as ControlService;

jest.mock('dayjs', () => ({
  __esModule: true,
  default: () => jest.requireActual('dayjs')('2022-09-13T18:30:00'),
}));

describe('SchedulerService', () => {
  let service: SchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        { provide: SchedulerDao, useValue: mockSchedulerDao },
        { provide: ControlService, useValue: mockControlService },
      ],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run the schedule function', () => {
    service.processCron();
  });
});
