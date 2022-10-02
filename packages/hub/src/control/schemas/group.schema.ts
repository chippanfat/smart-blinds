import mongoose from 'mongoose';
import { Groups } from 'src/types/groups.enum';

export interface Group {
  name: Groups;
  devices: mongoose.Types.ObjectId[];
}

export const GroupSchema = new mongoose.Schema<Group>({
  name: String,
  devices: [],
});
