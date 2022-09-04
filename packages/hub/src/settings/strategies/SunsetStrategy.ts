import {SettingStrategy} from "types/settingStrategy.interface";
import {Settings} from 'types/settings.enum';

export default class SunsetStrategy implements SettingStrategy {
  name: number = Settings.Sunset;

  execute(): void {
    // Do an api request here to get the current days sunset, if it's passed the current time then execute.
    // Only do this work on the groups and not the devices.
  }

}
