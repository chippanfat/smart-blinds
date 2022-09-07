import { Device } from 'control/schemas/device.schema';
import { Group } from 'control/schemas/group.schema';

export interface DaoInterface {
  getByName: (name: string) => Promise<Device>;
  updateDeviceState: (name: string, state: boolean) => void;
  getAllByGroup: (name: string) => Promise<Device[]>;
}
