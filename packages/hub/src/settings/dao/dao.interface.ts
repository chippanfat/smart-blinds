import { Settings } from 'src/settings/schemas/settings.schema';
export interface DaoInterface {
  getAllSettings: () => Promise<Settings[]>;
}
