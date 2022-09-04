import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Settings as SettingsSchema } from 'settings/schemas/settings.schema';
import {Settings as SettingEnum} from 'types/settings.enum';
import SettingsDao from './dao/settings';
import Context from "./strategies/context";
import SunsetStrategy from "./strategies/SunsetStrategy";

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private readonly settingsDao: SettingsDao) {}

  @Cron('* * * * *', {
    name: 'Blind Setting',
    timeZone: 'Europe/London',
  })
  async processCron() {
    this.logger.log('Running Settings');

    const allSettings = await this.settingsDao.getAllSettings();
    const enabledSettings = allSettings.filter((setting) => setting.enabled);

    for (const setting of enabledSettings) {
      await this.executeSetting(setting.strategy);
    }

  }

  private async executeSetting(settingStrategy: SettingEnum): Promise<void> {
    switch (settingStrategy) {
      case SettingEnum.Sunset:
        const context = new Context(new SunsetStrategy());
        await context.run();
        break;
    }
  }

  async getAllSettings(): Promise<SettingsSchema[]> {
    return await this.settingsDao.getAllSettings();
  }
}
