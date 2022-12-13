import { Group } from 'src/groups/schemas/group.schema';

export interface GroupDaoInterface {
  getAll(id: string): Promise<Group[]>;
}
