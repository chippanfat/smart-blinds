import { IsBoolean } from 'class-validator';

export default class UpdateDeviceStateDto {
  @IsBoolean()
  state: boolean;
}
