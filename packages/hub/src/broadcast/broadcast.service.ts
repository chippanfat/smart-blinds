import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Clients } from 'src/types/clientsModule.enum';

@Injectable()
export class BroadcastService {
  private readonly logger = new Logger(BroadcastService.name);
  constructor(@Inject(Clients.HubQueue) private client: ClientProxy) {}
  async sendBroadcastEvent() {
    try {
      this.client.send('broadcast', { device: 'blinds' }).subscribe();
      this.logger.log('Successfully sent broadcast message', {
        device: 'blinds',
      });
    } catch (e) {
      this.logger.error('Failed to send broadcast message', {
        message: e.message,
      });
    }
  }
}
