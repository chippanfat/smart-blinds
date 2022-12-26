import { GATEWAY_URL } from "../config";

function getToken(): string {
  const token = document.cookie
    .split(" ")
    .find((item) => item.includes("__session"))
    ?.replace("__session=", "");

  if (!token) {
    throw new Error("No token found from cookie");
  }

  return token;
}

function getBaseHeaders(sessionCookie: string): any {
  return {
    headers: {
      Authorization: `Bearer ${sessionCookie}`,
      "x-forwarded-host": "localhost",
      "x-forwarded-port": "3000",
      "Content-Type": "application/json",
    },
  };
}

export function fetcher<K>(url: string, init: {}) {
  const config = { ...getBaseHeaders(getToken()) };

  return fetch(
    GATEWAY_URL.concat(url),
    Object.assign({ ...config }, init)
  ).then((res) => res.json());
}

export function postFetcher(
  url: string,
  init: { arg: { body: Record<string, string>; method: string } }
) {
  const config = {
    ...getBaseHeaders(getToken()),
    method: init.arg.method,
    body: JSON.stringify(init.arg.body),
  };

  return fetch(
    GATEWAY_URL.concat(url),
    Object.assign({ ...config }, init)
  ).then((res) => res.json());
}
