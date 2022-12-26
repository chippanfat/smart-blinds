import { fetcher } from "app/request/fetcher";

export function getGroupsRequest(url: string, init: Record<string, string>) {
  return fetcher(url, init);
}
