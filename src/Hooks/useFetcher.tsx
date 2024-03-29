import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback } from "react";

interface UseFetcherProps {
  token?: string;
}

export interface FetcherData {
  body?: any;
  params?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: any;
  config?: any;
}

interface UseFetcher {
  fetcher: (
    url: string,
    data?: FetcherData,
    cb?: (response: AxiosResponse) => void,
    cbErr?: (reason: any) => void
  ) => any;
}

const baseURL = process.env.REACT_APP_BASE_URL ?? "";

const useFetcher: (props: UseFetcherProps) => UseFetcher = ({ token }) => {
  const fetcher = useCallback(
    async (
      url: string,
      data?: FetcherData,
      cb?: (response: AxiosResponse) => void,
      cbErr?: (reason: any) => void
    ) => {
      const options: AxiosRequestConfig = {
        url:
          url.includes("https:") || url.includes("http:")
            ? `${url}`
            : `${baseURL}${url ?? ""}`,
        method: data?.method ?? "GET",
        data: data?.body ?? {},
        params: data?.params ?? {},
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(data?.headers ?? {}),
        },
        ...(data?.config ?? {}),
      };
      try {
        if (cb) {
          const blankCBErr = () => {};
          axios(options)
            .then(cb)
            .catch(cbErr ?? blankCBErr);
        } else {
          const response = await axios(options);
          return response;
        }
      } catch (err) {
        return null;
      }
    },
    [token]
  );

  return { fetcher };
};

export default useFetcher;
