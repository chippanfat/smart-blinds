import mongoose from 'mongoose';
import { Repeater } from 'types/repeater.type';

export interface Scheduler {
  state: boolean;
  when: Repeater;
  start: Date;
  last: Date;
  enabled: boolean;
  devices: {
    device: string[];
    group: string[];
  };
}

export const SchedulerSchema = new mongoose.Schema<Scheduler>({
  state: Boolean,
  when: String,
  start: Date,
  last: Date,
  enabled: Boolean,
  devices: {
    device: [mongoose.Types.ObjectId],
    group: [mongoose.Types.ObjectId],
  },
});
