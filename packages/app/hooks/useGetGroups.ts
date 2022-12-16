import useSWR, { SWRResponse } from "swr";
import { Group } from "app/types/Group.interface";

export function useGetGroups<K>(): SWRResponse<Group[], Error> {
  return useSWR<Group[], Error>("/groups");
}
