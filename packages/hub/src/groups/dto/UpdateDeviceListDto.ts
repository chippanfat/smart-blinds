import { IsArray } from 'class-validator';

export default class UpdateDeviceListDto {
  @IsArray()
  deviceList: string[];
}
