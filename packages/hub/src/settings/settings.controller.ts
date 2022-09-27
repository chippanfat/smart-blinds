import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings as SettingsSchema } from 'src/settings/schemas/settings.schema';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async index(): Promise<SettingsSchema[]> {
    debugger;
    await this.settingsService.executeSetting(0, []);
    return await this.settingsService.getAllSettings();
  }
}
