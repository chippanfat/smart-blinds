// blinds-topology.service.ts
import { Inject, Injectable } from '@nestjs/common';
import type { Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  readonly exchange = 'blinds.cmd.x';

  constructor(@Inject('AMQP_CH') private readonly channel: Channel) {}

  queueName(deviceId: string) {
    // deviceId is likely an ObjectId hex string -> safe
    return `blinds.cmd.q.${deviceId}`;
  }

  async ensureDeviceQueue(deviceId: string) {
    const q = this.queueName(deviceId);

    await this.channel.assertQueue(q, {
      durable: true,
      arguments: {
        // Tune these to your needs
        'x-message-ttl': 5000, // a message must be ack'd within 5 seconds, we don't want to pile up messages
        'x-max-length': 5, // Not sure if this is correct, but it's a good starting point
      },
    });

    await this.channel.bindQueue(q, this.exchange, `cmd.device.${deviceId}`);

    return q;
  }

  publishToDevice(deviceId: string, payload: unknown) {
    return this.channel.publish(
      this.exchange,
      `cmd.device.${deviceId}`,
      Buffer.from(JSON.stringify(payload)),
      { contentType: 'application/json', persistent: true },
    );
  }
}
