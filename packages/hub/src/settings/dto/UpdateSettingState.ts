import { IsBoolean } from 'class-validator';

export default class UpdateSettingState {
  @IsBoolean()
  state: boolean;
}
