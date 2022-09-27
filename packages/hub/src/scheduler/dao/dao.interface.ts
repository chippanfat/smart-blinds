import { Scheduler } from 'src/scheduler/schemas/scheduler.schema';

export interface SchedulerInterface {
  getAllSchedules: () => Promise<Scheduler[]>;
}
