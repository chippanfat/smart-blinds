import { fetcher } from "app/request/fetcher";

export function getDevicesRequest(url: string, init: Record<string, string>) {
  return fetcher(url, init);
}
