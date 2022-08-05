import {Device} from 'control/schemas/device.schema';
export interface DaoInterface {
  getByName: (name: string) => Promise<Device>;
  updateDeviceState: (name: string, state: boolean) => void
}
