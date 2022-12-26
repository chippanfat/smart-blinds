import { fetcher } from "app/request/fetcher";

export function updateGroupDeviceList<K>(data: K) {
  return fetcher("/group/update", data);
}
