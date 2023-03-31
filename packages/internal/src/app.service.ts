import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { IStateChange } from 'internal/types/stateChange.interface';
import { Clients } from 'internal/types/clientsModule.enum';
const dgram = require('dgram');

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  constructor(
    @Inject(Clients.AddressQueue) private client: ClientProxy,
    private readonly httpService: HttpService,
  ) {}
  async doDeviceRequest(data: IStateChange): Promise<void> {
    const { address, state } = data;

    this.logger.log('Do device request', { address, state });

    this.httpService.post(address, { state }).subscribe((response) => {
      this.logger.log('device response', {
        status: response.status,
        text: response.statusText,
      });
    });
  }

  async doBroadcast(): Promise<void> {
    this.logger.log('Do socket broadcast');

    const socket = dgram.createSocket('udp4');

    socket.bind(8000, () => {
      socket.setBroadcast(true);
      const message = Buffer.from('yobruh');

      socket.send(message, 0, message.length, 5555, '255.255.255.255', () => {
        this.logger.log('Socket broadcast sent');
      });

      socket.on('message', (message, remote) => {
        this.logger.log('on message', { message, remote });

        this.client
          .send('address_update', { address: remote.address })
          .subscribe((value) => {
            this.logger.log('Device address update', { value });
          });

        setTimeout(() => {
          socket.close(() => {
            this.logger.log('Socket closed');
          });
        }, 10000);
      });
    });
  }
}
