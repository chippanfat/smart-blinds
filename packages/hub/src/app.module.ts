import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ControlModule } from 'src/control/control.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from 'src/scheduler/scheduler.module';
import { SettingsModule } from 'src/settings/settings.module';
import { ConfigModule } from 'src/config/config.module';

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
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ControlModule],
})
export class AppModule {}
