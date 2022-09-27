import { Injectable } from '@nestjs/common';
import { Settings } from 'src/types/settings.enum';
import { HttpService } from '@nestjs/axios';
import { ControlService } from 'src/control/control.service';
import { SettingStrategy } from 'src/types/settingStrategy.interface';
import * as dayjs from 'dayjs';
import mongoose from 'mongoose';

@Injectable()
export default class SunsetStrategy implements SettingStrategy {
  private groupIds: mongoose.Types.ObjectId[] = [];

  name: number = Settings.Sunset;

  constructor(
    private readonly httpService: HttpService,
    private readonly controlService: ControlService,
  ) {}

  setGroup(groupIds: mongoose.Types.ObjectId[]): SunsetStrategy {
    this.groupIds = groupIds;
    return this;
  }

  private shouldRunSetting(rawTime: string): boolean {
    const [shortTime, modifier] = rawTime.split(' ');
    const time = shortTime.split(':');

    const [hours, minutes, seconds] = time;

    const fullHour =
      modifier.toLowerCase() === 'pm' ? parseInt(hours, 10) + 12 : hours;
    const fullTime = fullHour.toString().concat(':', minutes, ':', seconds);
    const currentDateTime = dayjs()
      .format('YYYY-MM-DD')
      .concat('T', fullTime, 'Z');

    return dayjs().isAfter(currentDateTime);
  }

  execute(): void {
    // Do an api request here to get the current days sunset, if it's passed the current time then execute.
    // Only do this work on the groups and not the devices.
    const response = this.httpService.get<{ results: { sunset: string } }>(
      'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today',
    );

    response.subscribe(async (sub) => {
      const devices = await this.controlService.getAllDevicesByGroupIds(
        this.groupIds.map((item) => item.toString()),
      );

      if (!this.shouldRunSetting(sub.data.results.sunset)) {
        return;
      }

      for (const device of devices) {
        await this.controlService.changeDeviceState(device, false);
      }
    });
  }
}
