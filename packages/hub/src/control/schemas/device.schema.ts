import mongoose from 'mongoose';

export interface Device {
  name: string;
  address: string;
  state: boolean
}

export const DeviceSchema = new mongoose.Schema<Device>({
  name: String,
  address: String,
  state: Boolean
})
