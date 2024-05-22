import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Devices } from "../Resources/DeviceResources";
import { DevicePresets, defaultPresets } from "../Resources/PresetResources";
import { ServerResponse } from "../Resources/ServerResponseResources";
import { cloneDeep } from "lodash";
import axios from "axios";
import useTVSettings, {
  TVSettingsHook,
  defaultTVSettingsHook,
} from "../Hooks/useTVSettings";
import { defaultTVSettings } from "../Resources/TVSettingsResources";
import useGlobalDevice from "../Hooks/GlobalContext/useGlobalDevice";

interface GlobalContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface TVPosition {
  topPx: number;
  bottomPx: number;
  leftPx: number;
  rightPx: number;
}

type GlobalProps = OtherProps & TVSettingsHook;

interface OtherProps {
  tvShown: boolean;
  toggleTvShown: (nVal?: boolean) => void;
  presets: DevicePresets[];
  devices: Devices[];
  modes: string[];
  getModes: () => void;
  deleteDevice: (i: number) => Promise<ServerResponse>;
  addDevice: (device: Devices) => Promise<ServerResponse>;
  updateDevice: (i: number, nDevice: Devices) => Promise<ServerResponse>;
  updateDevicePreset: (
    i: number,
    presetName: string
  ) => Promise<ServerResponse>;
  addNewPreset: (i: number, name: string) => Promise<ServerResponse>;
}

export const defaultServerResponse: ServerResponse = {
  status: "error",
  message: "Context Provider was not initialized properly",
  code: 400,
};

export const serverNotFoundResponse: ServerResponse = {
  status: "error",
  message: "Endpoint or server not found.",
  code: 404,
};

const noCallResponse: ServerResponse = {
  status: "error",
  message: "No call was made to the server",
  code: 400,
};

export const successfulServerResponse: ServerResponse = {
  status: "success",
  message: "Device added successfully",
  code: 200,
};

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const defaultGlobalData = {
  tvShown: false,
  toggleTvShown: (nVal?: boolean) => null,
  presets: defaultPresets,
  devices: [],
  modes: [],
  getModes: async () => null,
  deleteDevice: async (i: number) => defaultServerResponse,
  addDevice: async (device: Devices) => defaultServerResponse,
  updateDevice: async (i: number, nDevice: Devices) => defaultServerResponse,
  updateDevicePreset: async (i: number, presetName: string) =>
    defaultServerResponse,
  addNewPreset: async (i: number, name: string) => defaultServerResponse,
  ...defaultTVSettingsHook,
};

export const GlobalContext = createContext<GlobalProps>(defaultGlobalData);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const tv = useTVSettings();
  const [tvShown, setTVShown] = useState(false);
  const toggleTvShown = useCallback(
    (nVal?: boolean) => {
      setTVShown(nVal ?? !tvShown);
    },
    [setTVShown, tvShown]
  );
  const deviceManager = useGlobalDevice({});
  const [modes, setModes] = useState<string[]>([]);

  const getModes = useCallback(async () => {
    const options = {
      method: "GET",
      url: baseURL + "/modes",
    };
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      response = response.data;
    } catch (e) {
      console.error(e);
    }
    if (response.status === "success") {
      setModes(response.data);
    }
  }, [setModes]);

  useEffect(() => {
    deviceManager.getDevices();
    deviceManager.getPresets();
    getModes();
    tv.getTVSettings();
  }, []);

  const value: GlobalProps = useMemo(() => {
    return {
      modes,
      tvShown,
      getModes,
      toggleTvShown,
      ...tv,
      ...deviceManager,
    };
  }, [modes, tvShown, getModes, toggleTvShown, deviceManager, tv]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
