import mongoose from 'mongoose';
import { Repeater } from 'types/repeater.type';

export interface Scheduler {
  repeat: {
    state: boolean;
    type: Repeater;
  };
  date: string;
  time: string;
}

export const SchedulerSchema = new mongoose.Schema<Scheduler>({
  repeat: {
    state: Boolean,
    type: String,
  },
  date: Date,
  time: String,
});
