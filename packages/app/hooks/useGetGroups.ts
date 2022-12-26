import useSWR, { SWRResponse } from "swr";
import { Group } from "app/types/Group.interface";
import { getGroupsRequest } from "app/request/getGroupsRequest";

export function useGetGroups(): SWRResponse<Group[], Error> {
  return useSWR<Group[], Error>("/groups", getGroupsRequest);
}
