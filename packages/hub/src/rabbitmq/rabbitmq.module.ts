import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';
import * as amqp from 'amqplib';
import * as fs from 'fs';
import * as path from 'path';
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

        // Check if using TLS (amqps://)
        const useTLS = queueUrl.startsWith('amqps://');
        let connectionOptions: any = {};

        if (useTLS) {
          // For TLS connections, add certificate options
          const caPath = path.join(__dirname, '../../certs/ca-cert.pem');
          
          // Check if CA cert exists, if not try local development path
          let caCert: Buffer | undefined;
          if (fs.existsSync(caPath)) {
            caCert = fs.readFileSync(caPath);
          } else {
            // For local development outside Docker
            const localCaPath = path.join(process.cwd(), '../../rabbitmq/certs/ca-cert.pem');
            if (fs.existsSync(localCaPath)) {
              caCert = fs.readFileSync(localCaPath);
            }
          }

          if (caCert) {
            connectionOptions = {
              ca: [caCert],
              rejectUnauthorized: true,
            };
          }
        }

        const connection = await amqp.connect(queueUrl, connectionOptions);
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
