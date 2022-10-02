import mongoose from 'mongoose';
import { Repeater } from 'src/types/repeater.type';

export interface Scheduler {
  _id: mongoose.Types.ObjectId;
  state: boolean;
  when: Repeater;
  start: Date;
  last: Date;
  enabled: boolean;
  devices: {
    device: mongoose.Types.ObjectId[];
    group: mongoose.Types.ObjectId[];
  };
  name: string;
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
  name: String,
});
