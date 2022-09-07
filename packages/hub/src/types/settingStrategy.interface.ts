import mongoose from 'mongoose';

export interface SettingStrategy {
  name: number;
  setGroup: (groupIds: mongoose.Types.ObjectId[]) => SettingStrategy;
  execute: () => void;
}
