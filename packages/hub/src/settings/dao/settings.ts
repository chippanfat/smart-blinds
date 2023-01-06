import { Injectable } from '@nestjs/common';
import { DaoInterface } from 'src/settings/dao/dao.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings as SettingsSchema } from 'src/settings/schemas/settings.schema';
import InvalidSettingsException from 'src/control/errors/InvalidSettingsException';

@Injectable()
export default class Settings implements DaoInterface {
  constructor(
    @InjectModel('settings') private settingsModel: Model<SettingsSchema>,
  ) {}

  async getAllSettings(): Promise<SettingsSchema[]> {
    const settings = await this.settingsModel.find();

    if (!settings) {
      throw new InvalidSettingsException();
    }

    return settings;
  }

  async updateState(id: string, state: boolean): Promise<void> {
    await this.settingsModel.findOneAndUpdate({ _id: id }, { enabled: state });
  }
}
