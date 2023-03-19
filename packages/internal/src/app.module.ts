import { Module } from '@nestjs/common';
import { AppController } from 'internal/app.controller';
import { AppService } from 'internal/app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
