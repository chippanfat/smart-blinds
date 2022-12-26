import { Device } from "./Device.interface";
import { Group } from "./Group.interface";

export interface Setting {
  _id: string;
  name: string;
  enabled: boolean;
  devices: { device: Device[]; group: Group[] };
}
