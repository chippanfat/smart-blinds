import useSWR, { SWRResponse } from "swr";
import { Device } from "app/types/Device.interface";
import { fetcher } from "app/request/fetcher";

export function useGetDevices<K>(): SWRResponse<Device[], Error> {
  return useSWR<Device[], Error>("/control/devices", fetcher);
}
