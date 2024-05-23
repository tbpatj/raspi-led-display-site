import { useCallback, useState } from "react";
import {
  GetTVSettingsFunc,
  GetTVSettingsResponse,
  SetTVSettingsFunc,
  TVSettings,
  defaultTVSettings,
} from "../../Resources/TVSettingsResources";
import axios from "axios";
import { serverNotFoundResponse } from "../../Context/GlobalContext";
import { ServerResponse } from "../../Resources/ServerResponseResources";

export interface TVSettingsHook {
  tv_settings: TVSettings;
  getTVSettings: GetTVSettingsFunc;
  setTVSettings: SetTVSettingsFunc;
}

export const defaultTVSettingsHook: TVSettingsHook = {
  tv_settings: defaultTVSettings,
  getTVSettings: async () => {
    return {} as GetTVSettingsResponse;
  },
  setTVSettings: async () => {
    return {} as ServerResponse;
  },
};

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const useTVSettings: () => TVSettingsHook = () => {
  const [tv_settings, setTv_settings] = useState<TVSettings>(defaultTVSettings);

  //get the current tv settings from the server
  const getTVSettings: GetTVSettingsFunc = useCallback(async () => {
    const options = {
      method: "GET",
      url: baseURL + "/tv",
    };
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      response = response?.data;
      if (response.status === "success") {
        setTv_settings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    return {} as GetTVSettingsResponse;
  }, [setTv_settings]);

  //update the tv settings on the server
  const setTVSettings: SetTVSettingsFunc = useCallback(
    async (settings: TVSettings) => {
      if (
        settings.padding.x === 0 ||
        settings.padding.y === 0 ||
        settings.iterations.x === 0 ||
        settings.iterations.y === 0
      ) {
        setTv_settings(settings);
        return serverNotFoundResponse;
      }
      const options = {
        method: "POST",
        url: baseURL + "/tv",
        data: settings,
      };
      let response = serverNotFoundResponse;
      try {
        response = await axios(options);
        response = response?.data;
        if (response.status === "success") {
          setTv_settings(settings);
        }
      } catch (error) {
        console.log(error);
      }
      //   setTv_settings(settings);
      return {} as ServerResponse;
    },
    [setTv_settings]
  );
  return { tv_settings, getTVSettings, setTVSettings };
};

export default useTVSettings;
