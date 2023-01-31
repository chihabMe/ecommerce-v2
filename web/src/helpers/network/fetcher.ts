import { refreshEndpoint } from "@/config/constances";
import axios from "axios";
export function fetcherConfig({
  method,
  body,
  tokens,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  tokens?: {
    refresh?: string;
    access?: string;
  };
}): RequestInit {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: tokens?.access ? `${tokens.access}` : "",
      refresh: tokens?.refresh ? `${tokens.refresh}` : "",
    },

    credentials: "include",
    mode: "cors",

    body,
  };
}
export const refreshFetcher = async ({ refresh }: { refresh?: string }) => {
  const config = fetcherConfig({
    method: "POST",

    tokens: {
      refresh,
    },
  });

  const response = await fetch(refreshEndpoint, config);
  let data;
  try {
    data = await response.json();
  } catch {}
  return {
    status: response.status,
    access: data?.access,
    refresh: data?.refresh,
  };
};
export const fetcher = async ({
  url,
  method,
  body,
  tokens,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  tokens?: {
    access?: string;
    refresh?: string;
  };
}) => {
  let config = fetcherConfig({
    method,
    body,
    tokens,
  });
  let refreshResponse;
  let data;
  let response;
  try {
    response = await fetch(url, config);
  } catch {
    return {
      refreshed: false,
      refreshResponse: undefined,
      status: 403,
      data: undefined,
    };
  }

  if (response.status == 401) {
    refreshResponse = await refreshFetcher({
      refresh: tokens?.refresh,
    });
    if (refreshResponse.status == 200 && refreshResponse.access) {
      config = fetcherConfig({
        method: "POST",
        body,
        tokens: {
          access: "Bearer " + refreshResponse.access,
        },
      });
      response = await fetch(url, config);
    }
  }

  try {
    data = await response.json();
  } catch {}

  return {
    refreshResponse,
    status: response.status,
    data: data,
    ok: response.ok,
  };
};
