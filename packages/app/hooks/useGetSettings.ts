import useSWR, { SWRResponse } from "swr";
import { Setting } from "app/types/Setting.interface";
import { fetcher } from "app/request/fetcher";

export function useGetSettings<K>(): SWRResponse<Setting[], Error> {
  return useSWR<Setting[], Error>("/settings", fetcher);
}
