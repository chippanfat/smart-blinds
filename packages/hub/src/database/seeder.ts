import mongoose from 'mongoose';
import { DeviceSchema, Device } from '../control/schemas/device.schema';
import { GroupSchema } from '../control/schemas/group.schema';
import { SchedulerSchema } from '../scheduler/schemas/scheduler.schema';
import { SettingsSchema } from '../settings/schemas/settings.schema';
import { Groups } from '../types/groups.enum';
import { Repeater } from '../types/repeater.type';
import { Settings } from '../types/settings.enum';

mongoose
  .connect('mongodb://localhost:27017', {
    dbName: 'smart',
    user: 'root',
    pass: 'example',
  })
  .then((mongoose) => {
    const DeviceModel = mongoose.model('devices', DeviceSchema);
    const GroupModel = mongoose.model('groups', GroupSchema);
    const SchedulerModel = mongoose.model('schedules', SchedulerSchema);
    const SettingModel = mongoose.model('settings', SettingsSchema);

    const devices: Device[] = [
      { name: 'living room', address: '192.168.1.35', state: false },
      { name: 'bedroom', address: '192.168.1.36', state: false },
    ];

    DeviceModel.insertMany(devices).then((result) => {
      const allGroup = new GroupModel({
        name: Groups.All,
        devices: result.map((item) => new mongoose.Types.ObjectId(item._id)),
      });

      allGroup.save().then((groupResult) => {
        console.log(groupResult);
        const schedule = new SchedulerModel({
          state: false,
          when: 'daily' as Repeater,
          start: new Date('2020-01-01'),
          last: new Date('2020-01-01'),
          enabled: true,
          devices: {
            device: [],
            group: [groupResult._id],
          },
          name: 'Turn off devices',
        });

        schedule.save().then((scheduleResult) => {
          console.log(scheduleResult);
          const setting = new SettingModel({
            name: 'Turn off at Sunset',
            strategy: Settings.Sunset,
            enabled: false,
            devices: {
              device: [],
              group: [groupResult._id],
            },
          });

          setting.save().then((settingResults) => {
            console.log(settingResults);
            process.exit();
          });
        });
      });
    });
  });
