import mongoose from 'mongoose';

export interface Device {
  name: string;
  address: string;
  state: boolean;
  _id?: mongoose.Types.ObjectId;
}

export const DeviceSchema = new mongoose.Schema<Device>(
  {
    name: String,
    address: String,
    state: Boolean,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);
