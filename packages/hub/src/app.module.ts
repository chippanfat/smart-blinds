import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ConfigService } from '@nestjs/config';
import { ControlModule } from 'src/control/control.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from 'src/scheduler/scheduler.module';
import { SettingsModule } from 'src/settings/settings.module';
import { ConfigModule } from 'src/config/config.module';
import { GroupsModule } from 'src/groups/groups.module';
import { BroadcastModule } from 'src/broadcast/broadcast.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        if (configService.getOrThrow('nodeEnv') === 'development') {
          return {
            uri: configService.getOrThrow<string>('database.uri'),
            dbName: configService.getOrThrow<string>('database.name'),
            user: configService.getOrThrow('database.auth.user'),
            pass: configService.getOrThrow('database.auth.pass'),
          };
        }

        if (configService.getOrThrow('nodeEnv') === 'production') {
          return {
            uri: configService.getOrThrow<string>('database.uri'),
            dbName: configService.getOrThrow<string>('database.name'),
            ssl: configService.getOrThrow<string>('database.certs.ssl'),
            sslValidate: configService.getOrThrow<string>(
              'database.certs.sslValidate',
            ),
            sslKey: `${__dirname}/${configService.getOrThrow<string>(
              'database.certs.sslKey',
            )}`,
            sslCert: `${__dirname}/${configService.getOrThrow<string>(
              'database.certs.sslCert',
            )}`,
            authMechanism: configService.getOrThrow<string>(
              'database.certs.authMechanism',
            ),
          };
        }
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ControlModule,
    SchedulerModule,
    SettingsModule,
    GroupsModule,
    BroadcastModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ControlModule],
})
export class AppModule {}
