import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import Device from 'control/dao/device';
import InvalidDeviceException from './errors/InvalidDeviceException';
import { Device as ControlDevice } from 'control/schemas/device.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ControlService {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly deviceDao: Device,
    private readonly httpService: HttpService,
  ) {}

  private async sendDeviceTrigger(
    hardwareAddress: string,
    state: boolean,
  ): Promise<void> {
    this.logger.log('Do device request', { address: hardwareAddress, state });
    const response = await this.httpService.get(
      `${hardwareAddress}?state=${state}`,
    );

    this.logger.log('device response', { response });
  }

  private async changeDeviceState(
    device: ControlDevice,
    state: boolean,
  ): Promise<void> {
    try {
      // condition avoids triggering the =hardware if the state hasn't changed
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

  async changeState(name: string, state: boolean): Promise<void> {
    await this.changeDeviceState(await this.deviceDao.getByName(name), state);
  }

  async changeGroupState(name: string, state: boolean): Promise<void> {
    const devices = await this.deviceDao.getAllByGroup(name);

    for (const device of devices) {
      await this.changeDeviceState(device, state);
    }
  }
}
