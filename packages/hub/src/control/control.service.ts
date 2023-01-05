import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import Device from 'src/control/dao/device';
import InvalidDeviceException from './errors/InvalidDeviceException';
import { Device as ControlDevice } from 'src/control/schemas/device.schema';
import { Group as ControlGroup } from 'src/groups/schemas/group.schema';
import { ClientProxy } from '@nestjs/microservices';
import { Clients } from 'src/types/clientsModule.enum';

@Injectable()
export class ControlService {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly deviceDao: Device,
    @Inject(Clients.HubQueue) private client: ClientProxy,
  ) {}

  private async sendDeviceTrigger(
    hardwareAddress: string,
    state: boolean,
  ): Promise<void> {
    try {
      await this.client
        .send('state', { address: hardwareAddress, state })
        .subscribe();

      this.logger.log('Do device request', { address: hardwareAddress, state });
    } catch (e) {
      this.logger.error('Failed to add trigger onto queue', {
        error: e.message,
      });
    }
  }

  public async getAllDevices(): Promise<ControlDevice[]> {
    return await this.deviceDao.getAllDevices();
  }

  public async changeDeviceState(
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

  async changeState(id: string, state: boolean): Promise<void> {
    await this.changeDeviceState(await this.deviceDao.getById(id), state);
  }

  async changeGroupState(name: string, state: boolean): Promise<void> {
    const devices = await this.deviceDao.getAllByGroup(name);

    for (const device of devices) {
      await this.changeDeviceState(device, state);
    }
  }

  async getAllDevicesByGroupIds(ids: string[]): Promise<ControlDevice[]> {
    return await this.deviceDao.getAllDevicesByGroupIds(ids);
  }

  async getGroupsById(id: string[]): Promise<ControlGroup[]> {
    return await this.deviceDao.getGroupsById(id);
  }
}
