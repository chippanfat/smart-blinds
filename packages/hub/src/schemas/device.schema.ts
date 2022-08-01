import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Device {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: Boolean })
  state: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
export type DeviceDocument = Device & Document;
