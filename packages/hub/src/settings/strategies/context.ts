import { SettingStrategy } from 'src/types/settingStrategy.interface';
import mongoose from 'mongoose';

export default class Context {
  private strategy: SettingStrategy;

  setStrategy(strategy: SettingStrategy, groupIds: mongoose.Types.ObjectId[]) {
    this.strategy = strategy;
    this.strategy.setGroup(groupIds);
  }

  run(): void {
    this.strategy.execute();
  }
}
