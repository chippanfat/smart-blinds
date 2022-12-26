import { Injectable, Logger } from '@nestjs/common';
import mongoose from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { Settings as SettingsSchema } from 'src/settings/schemas/settings.schema';
import { Settings as SettingEnum } from 'src/types/settings.enum';
import SettingsDao from './dao/settings';
import Context from './strategies/context';
import SunsetStrategy from './strategies/SunsetStrategy';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    private readonly settingsDao: SettingsDao,
    private readonly httpClient: HttpService,
    private readonly sunsetStrategy: SunsetStrategy,
  ) {}

  @Cron('0 * * * *', {
    name: 'Blind Setting',
    timeZone: 'Europe/London',
  })
  async processCron() {
    this.logger.log('Running Settings');

    const allSettings = await this.settingsDao.getAllSettings();
    const enabledSettings = allSettings.filter((setting) => setting.enabled);

    for (const setting of enabledSettings) {
      this.executeSetting(
        setting.strategy,
        setting.devices.group as unknown as mongoose.Types.ObjectId[],
      );
    }
  }

  executeSetting(
    settingStrategy: SettingEnum,
    groupIds: mongoose.Types.ObjectId[],
  ): void {
    const context = new Context();

    switch (settingStrategy) {
      case SettingEnum.Sunset:
        context.setStrategy(this.sunsetStrategy, groupIds);
        break;
    }

    context.run();
  }

  async getAllSettings(): Promise<SettingsSchema[]> {
    return await this.settingsDao.getAllSettings();
  }

  async updateSettingState(id: string, state: boolean): Promise<void> {
    await this.settingsDao.updateState(id, state);
  }
}
