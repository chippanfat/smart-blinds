import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings as SettingsSchema } from 'settings/schemas/settings.schema';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async index(): Promise<SettingsSchema[]> {
    return await this.settingsService.getAllSettings();
  }
}
