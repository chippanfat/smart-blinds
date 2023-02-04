import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IStateChange } from 'internal/types/stateChange.interface';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}
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
}
