import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Tokens } from '../types/tokens.enum';

@Injectable()
export class QueueService {
  constructor(@Inject(Tokens.RabbitMQ) private readonly client: ClientProxy) {}
}
