import mongoose from 'mongoose';
import { Repeater } from 'types/repeater.type';

export interface Scheduler {
  state: boolean;
  when: Repeater;
  datetime: string;
}

export const SchedulerSchema = new mongoose.Schema<Scheduler>({
  state: Boolean,
  when: String,
  datetime: Date,
});
