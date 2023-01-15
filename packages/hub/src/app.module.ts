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
      `mongodb+srv://${process.env.DB_USER}@${process.env.DB_HOST}`,
      {
        dbName: process.env.DB_NAME,
        ssl: true,
        sslValidate: true,
        sslKey: `${__dirname}/X509-cert.pem`,
        sslCert: `${__dirname}/X509-cert.pem`,
        authMechanism: 'MONGODB-X509',
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
