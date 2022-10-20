import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Tokens } from 'src/types/tokens.enum';

@Injectable()
export class QueueService {
  constructor(@Inject(Tokens.RabbitMQ) private readonly client: ClientProxy) {}

  async sendMessage() {
    await this.client.send('state', { state: false }).subscribe((value) => {
      console.log(value);
    });
  }
}
