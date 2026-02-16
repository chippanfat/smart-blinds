import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';
import * as amqp from 'amqplib';
import type { Channel } from 'amqplib';

// Don't export this, we'll end up with a circular dependency
const AMQP_CH = 'AMQP_CH';
const TOPIC_NAME = 'blinds.cmd.x';

@Global()
@Module({
  providers: [
    {
      provide: AMQP_CH,
      useFactory: async (configService: ConfigService): Promise<Channel> => {
        const queueUrl = configService.get<string>('queue.url');
        if (!queueUrl) {
          throw new Error(
            'queue.url is undefined. Ensure HUB_QUEUE_URL is set in .env'
          );
        }
        const connection = await amqp.connect(queueUrl);
        const channel = await connection.createChannel();
        await channel.assertExchange(TOPIC_NAME, 'topic')

        return channel;
      },
      inject: [ConfigService],
    },
    RabbitMQService,
  ],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
