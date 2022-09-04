import mongoose from 'mongoose';

export interface Settings {
  name: string;
  strategy: number;
  enabled: boolean;
  devices: {
    device: string[];
    group: string[];
  };
}

export const SettingsSchema = new mongoose.Schema<Settings>({
  name: String,
  strategy: Number,
  enabled: Boolean,
  devices: {
    device: [mongoose.Types.ObjectId],
    group: [mongoose.Types.ObjectId],
  },
});
