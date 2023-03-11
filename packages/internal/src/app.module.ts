import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { BroadcastModule } from './broadcast/broadcast.module';

@Module({
  imports: [HttpModule, BroadcastModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
