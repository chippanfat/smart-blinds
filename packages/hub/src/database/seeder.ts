import mongoose from 'mongoose';
import { DeviceSchema, Device } from '../control/schemas/device.schema';
import { GroupSchema } from '../control/schemas/group.schema';
import { Groups } from '../types/groups.enum';

mongoose
  .connect('mongodb://localhost:27017', {
    dbName: 'smart',
    user: 'root',
    pass: 'example',
  })
  .then((mongoose) => {
    const DeviceModel = mongoose.model('devices', DeviceSchema);
    const GroupModel = mongoose.model('groups', GroupSchema);

    const devices: Device[] = [
      { name: 'living room', address: '192.168.1.35', state: true },
    ];

    devices.forEach((item) => {
      const device = new DeviceModel(item);
      device.save().then((result) => {

        const objectId = new mongoose.Types.ObjectId(result.id);
        const group = new GroupModel({
          name: Groups.Downstairs,
          devices: [objectId],
        });

        group.save().then((result) => {
          process.exit();
        });
      });
    });
  });
