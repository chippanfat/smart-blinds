import mongoose from 'mongoose';
import { Groups } from 'types/groups.enum';

export interface Group {
  name: Groups;
  devices: string[];
}

export const GroupSchema = new mongoose.Schema<Group>({
  name: String,
  devices: [],
});
