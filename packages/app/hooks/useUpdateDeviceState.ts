import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { postFetcher } from "app/request/fetcher";

export function useUpdateDeviceState(
  deviceId: string
): SWRMutationResponse<void, Error> {
  return useSWRMutation<void, Error>(
    `/control/device/${deviceId}`,
    postFetcher
  );
}
