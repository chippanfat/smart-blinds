import useSWR, { SWRResponse } from "swr";
import { Device } from "app/types/Device.interface";

export function useDevice<K>(): SWRResponse<Device[], Error> {
  return useSWR<Device[], Error>("/control/devices");
}
