import { useEffect, useState } from "react";
import { fetcher as fetchWithRefresh } from "@/helpers/network/fetcher";

const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | number>(null);

  const request = async ({
    method,
    url,
    body,
  }: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    body?: string;
  }) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      // const response = await fetch(url, {
      //   method,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body,
      //   mode: "cors",
      //   credentials: "include",
      // hidden});
      const { ok, data, status } = await fetchWithRefresh({
        method,
        url,
        body,
      });
      // const data = await response.json();
      if (!ok) {
        setError(true);
        setSuccess(false);
      } else setSuccess(true);

      setData(data);
      console.log("staus>>>", status);
      if (status != 204) {
        setLoading(false);
      }
      setStatus(status);
      return data;
    } catch (err) {
      setError(true);
      setLoading(false);
      setStatus(null);
    }
  };
  const get = async ({ url, body }: { url: string; body?: string }) => {
    return await request({ method: "GET", url, body });
  };
  const post = async ({ url, body }: { url: string; body?: string }) => {
    return await request({ method: "POST", url, body });
  };
  const update = async ({ url, body }: { url: string; body?: string }) => {
    return await request({ method: "PUT", url, body });
  };
  const remove = async ({ url, body }: { url: string; body?: string }) => {
    return await request({ method: "DELETE", url, body });
  };
  return {
    loading,
    data,
    fetcher: request,
    status,
    error,
    success,
    get,
    post,
    update,
    remove,
  };
};
export default useFetch;
