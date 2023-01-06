import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { Group } from "app/types/Group.interface";
import { postFetcher } from "app/request/fetcher";

export function useUpdateSettingState(
  settingId: string
): SWRMutationResponse<Group[], Error> {
  return useSWRMutation<Group[], Error>(`/settings/${settingId}`, postFetcher);
}
