import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { Group } from "app/types/Group.interface";
import { postFetcher } from "app/request/fetcher";

export function useUpdateGroupDevice(
  groupId: string
): SWRMutationResponse<Group[], Error> {
  return useSWRMutation<Group[], Error>(`/groups/list/${groupId}`, postFetcher);
}
