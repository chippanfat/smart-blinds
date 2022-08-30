import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Device from 'control/dao/device';
import InvalidDeviceException from './errors/InvalidDeviceException';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ControlService {
  constructor(
    private readonly deviceDao: Device,
    private readonly httpService: HttpService,
  ) {}

  private async sendDeviceTrigger(
    hardwareAddress: string,
    state: boolean,
  ): Promise<void> {
    await this.httpService.get(`${hardwareAddress}?state=${state}`);
  }

  async changeDeviceState(name: string, state: boolean): Promise<void> {
    try {
      const device = await this.deviceDao.getByName(name);

      // condition avoids triggering the hardware if the state hasn't changed
      if (device.state !== state) {
        await this.deviceDao.updateDeviceState(device.name, state);
        await this.sendDeviceTrigger(device.address, state);
      }
    } catch (e) {
      if (e instanceof InvalidDeviceException) {
        throw new HttpException('Unable to find device', HttpStatus.NOT_FOUND);
      }

      throw new e();
    }
  }
}
