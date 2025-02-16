import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import Settings from './dao/settings';
import { SettingsSchema } from './schemas/settings.schema';
import { HttpModule } from '@nestjs/axios';
import SunsetStrategy from './strategies/SunsetStrategy';
import { ControlModule } from 'src/control/control.module';
import { ControlService } from 'src/control/control.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'settings', schema: SettingsSchema }]),
    HttpModule,
    ControlModule,
  ],
  providers: [
    SettingsService,
    Settings,
    ControlModule,
    ControlService,
    SunsetStrategy,
  ],
  controllers: [SettingsController],
})
export class SettingsModule {}
