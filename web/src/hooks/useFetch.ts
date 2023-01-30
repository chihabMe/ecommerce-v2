import { useState } from "react";
import { fetcher as fetchWithRefresh } from "@/helpers/network/fetcher";

const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetcher = async ({
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
      // });
      const { ok, data } = await fetchWithRefresh({
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
      return data;
    } catch (err) {
    } finally {
      setLoading(false);
      setError(true);
    }
  };
  const get = async ({ url, body }: { url: string; body?: string }) => {
    return await fetcher({ method: "GET", url, body });
  };
  const post = async ({ url, body }: { url: string; body?: string }) => {
    return await fetcher({ method: "POST", url, body });
  };
  const update = async ({ url, body }: { url: string; body?: string }) => {
    return await fetcher({ method: "PUT", url, body });
  };
  const remove = async ({ url, body }: { url: string; body?: string }) => {
    return await fetcher({ method: "DELETE", url, body });
  };
  return {
    loading,
    data,
    fetcher,
    error,
    success,
    get,
    post,
    update,
    remove,
  };
};
export default useFetch;
