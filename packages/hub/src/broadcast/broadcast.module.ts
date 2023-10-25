import { Module } from '@nestjs/common';
import { BroadcastController } from 'src/broadcast/broadcast.controller';
import { BroadcastService } from 'src/broadcast/broadcast.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  controllers: [BroadcastController],
  providers: [BroadcastService],
  imports: [QueueModule],
})
export class BroadcastModule {}
