import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { postFetcher } from "app/request/fetcher";

export function useBroadcastDeviceList(): SWRMutationResponse<void, Error> {
  return useSWRMutation<void, Error>("/broadcast", postFetcher);
}
