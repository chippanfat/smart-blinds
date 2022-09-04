import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import Settings from './dao/settings';
import { SettingsSchema } from './schemas/settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'settings', schema: SettingsSchema }]),
  ],
  providers: [SettingsService, Settings],
  controllers: [SettingsController],
})
export class SettingsModule {}
