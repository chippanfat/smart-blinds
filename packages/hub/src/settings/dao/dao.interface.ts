import { Settings } from 'src/settings/schemas/settings.schema';
export interface DaoInterface {
  getAllSettings: () => Promise<Settings[]>;

  updateState(id: string, state: boolean): Promise<void>;
}
