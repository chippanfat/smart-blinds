import { Controller, Get, Logger, Param, Body, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings as SettingsSchema } from 'src/settings/schemas/settings.schema';
import UpdateSettingState from 'src/settings/dto/UpdateSettingState';

@Controller('settings')
export class SettingsController {
  private readonly logger: Logger = new Logger(SettingsController.name);

  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async index(): Promise<SettingsSchema[]> {
    return await this.settingsService.getAllSettings();
  }

  @Patch(':settingId')
  async update(
    @Param() params: { settingId: string },
    @Body() body: UpdateSettingState,
  ): Promise<Record<string, unknown>> {
    this.logger.debug('Update setting state', { params, body });
    await this.settingsService.updateSettingState(params.settingId, body.state);

    return {};
  }
}
