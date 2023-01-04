import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ControlModule } from 'src/control/control.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from 'src/scheduler/scheduler.module';
import { SettingsModule } from 'src/settings/settings.module';
import { ConfigModule } from 'src/config/config.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
      {
        dbName: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
      },
    ),
    ScheduleModule.forRoot(),
    ControlModule,
    SchedulerModule,
    SettingsModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ControlModule],
})
export class AppModule {}
