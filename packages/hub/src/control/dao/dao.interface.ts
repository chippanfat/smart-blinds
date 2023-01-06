import { Device } from 'src/control/schemas/device.schema';

export interface DaoInterface {
  getAllDevices: () => Promise<Device[]>;
  getById: (id: string) => Promise<Device>;
  updateDeviceState: (name: string, state: boolean) => void;
  getAllByGroup: (name: string) => Promise<Device[]>;
}
