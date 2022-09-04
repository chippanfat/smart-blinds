import { Settings } from 'settings/schemas/settings.schema';
export interface DaoInterface {
  getAllSettings: () => Promise<Settings[]>;
}
