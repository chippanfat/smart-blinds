import {SettingStrategy} from "types/settingStrategy.interface";

export default class Context {
  constructor(private strategy: SettingStrategy) {}

  setStrategy(strategy: SettingStrategy) {
    this.strategy = strategy;
  }

  async run(): Promise<void> {
    await this.strategy.execute();
  }

}
