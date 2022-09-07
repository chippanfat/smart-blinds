import { FactoryProvider, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControlModule } from './control/control.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'smart',
      user: 'root',
      pass: 'example',
    }),
    ScheduleModule.forRoot(),
    ControlModule,
    SchedulerModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ControlModule],
})
export class AppModule {}
