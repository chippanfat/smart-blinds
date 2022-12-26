import useSWR, { SWRResponse } from "swr";
import { Group } from "app/types/Group.interface";
import { fetcher } from "app/request/fetcher";

export function useGetGroups(): SWRResponse<Group[], Error> {
  return useSWR<Group[], Error>("/groups", fetcher);
}
