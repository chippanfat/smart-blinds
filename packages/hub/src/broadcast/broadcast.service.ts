import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Clients } from 'src/types/clientsModule.enum';

@Injectable()
export class BroadcastService {
  private readonly logger = new Logger(BroadcastService.name);
  constructor(@Inject(Clients.HubQueue) private client: ClientProxy) {}
  async sendBroadcastEvent() {
    try {
      await this.client.send('broadcast', {}).subscribe();
      this.logger.log('Send broadcast event');
    } catch (e) {
      this.logger.error('Failed broadcast message', { message: e.message });
    }
  }
}
