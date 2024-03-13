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

interface GlobalContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface TVPosition {
  topPx: number;
  bottomPx: number;
  leftPx: number;
  rightPx: number;
}

interface GlobalProps {
  tvShown: boolean;
  toggleTvShown: (nVal?: boolean) => void;
  presets: DevicePresets[];
  devices: Devices[];
  modes: string[];
  addDevice: (device: Devices) => Promise<ServerResponse>;
  updateDevice: (i: number, nDevice: Devices) => Promise<ServerResponse>;
  updateDevicePreset: (
    i: number,
    presetName: string
  ) => Promise<ServerResponse>;
  addNewPreset: (i: number, name: string) => Promise<ServerResponse>;
}

const defaultServerResponse: ServerResponse = {
  status: "error",
  message: "Context Provider was not initialized properly",
  code: 400,
};

const serverNotFoundResponse: ServerResponse = {
  status: "error",
  message: "Endpoint or server not found.",
  code: 404,
};

const noCallResponse: ServerResponse = {
  status: "error",
  message: "No call was made to the server",
  code: 400,
};

const noPresetFoundResponse: ServerResponse = {
  status: "error",
  message: "No preset found",
  code: 404,
};

const successfulServerResponse: ServerResponse = {
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
  addDevice: async (device: Devices) => defaultServerResponse,
  updateDevice: async (i: number, nDevice: Devices) => defaultServerResponse,
  updateDevicePreset: async (i: number, presetName: string) =>
    defaultServerResponse,
  addNewPreset: async (i: number, name: string) => defaultServerResponse,
};

export const GlobalContext = createContext<GlobalProps>(defaultGlobalData);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [tvShown, setTVShown] = useState(false);
  const toggleTvShown = useCallback(
    (nVal?: boolean) => {
      setTVShown(nVal ?? !tvShown);
    },
    [setTVShown, tvShown]
  );
  const [devices, setDevices] = useState<Devices[]>([]);
  const [presets, setPresets] = useState<DevicePresets[]>(defaultPresets);
  const [modes, setModes] = useState<string[]>([]);

  const getDevices = useCallback(async () => {
    const options = {
      method: "GET",
      url: baseURL + "/devices",
    };
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      console.log(response);
      response = response.data;
    } catch (e) {
      console.error(e);
    }
    if (response.status === "success") {
      setDevices(response.data);
    }
  }, []);

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
  }, []);

  const getPresets = useCallback(async () => {
    const options = {
      method: "GET",
      url: baseURL + "/presets",
    };
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      response = response.data;
    } catch (e) {
      console.error(e);
    }
    if (response.status === "success") {
      setPresets(response.data);
    }
  }, []);

  useEffect(() => {
    getDevices();
    getPresets();
    getModes();
  }, []);

  const addDevice = useCallback(
    async (device: Devices) => {
      // do a call to the server

      const options = {
        method: "POST",
        data: device,
        url: baseURL + "/addDevice",
      };

      let response =
        process.env.REACT_APP_DEV_MODE == "false"
          ? serverNotFoundResponse
          : successfulServerResponse;
      try {
        response = await axios(options);
        console.log(response);
        response = response.data;
      } catch (e) {
        console.error(e);
      }
      // const response: ServerResponse = cloneDeep(successfulServerResponse);
      //handle response and potentially push the new device to our list of devices
      if (response?.status === "success") {
        const nDevices = cloneDeep(devices);
        nDevices.push(device);
        setDevices(nDevices);
        //TODO preset handler, make sure when the device gets added if there are no default presets for the device then create one.

        return response;
      } else {
        return response;
      }
    },
    [devices]
  );
  const updateDevice = useCallback(
    async (i: number, nDevice: Devices) => {
      // do a call to the server
      const options = {
        method: "POST",
        data: nDevice,
        url: `${baseURL}/updateDevice/${nDevice.name}`,
      };
      let response =
        process.env.REACT_APP_DEV_MODE == "false"
          ? serverNotFoundResponse
          : successfulServerResponse;
      try {
        response = await axios(options);
        console.log(response);
        response = response.data;
      } catch (e) {
        console.error(e);
      }
      // const response: ServerResponse = cloneDeep(successfulServerResponse);

      //handle response and potentially push the new device to our list of devices
      if (response.status === "success") {
        const nDevices = cloneDeep(devices);
        nDevices[i] = nDevice;
        setDevices(nDevices);
        console.log("updated");
        //TODO preset handler, make sure when the device gets added if there are no default presets for the device then create one.

        return response;
      } else {
        return response;
      }
    },
    [devices]
  );

  const addNewPreset = useCallback(
    async (i: number, name: string) => {
      const nPresets = cloneDeep(presets);
      const settings = cloneDeep(devices[i].settings);
      settings.name = name;
      const presetI = presets.findIndex(
        (preset) => preset.name === name && preset.type === devices[i].type
      );
      let response: ServerResponse = cloneDeep(noCallResponse);
      if (presetI !== -1) {
        //a preset of that device already exists
        nPresets[presetI] = settings;
        //call to server to update existing preset
        response = cloneDeep(successfulServerResponse);
      } else {
        //create a new preset
        nPresets.push(settings);
        //call to server to add a new preset
        response = cloneDeep(successfulServerResponse);
      }

      //update the presets list
      if (response.status === "success") {
        setPresets(nPresets);
      }
      return response;
    },
    [devices, presets]
  );

  const updateDevicePreset = useCallback(
    async (i: number, presetName: string) => {
      let response = noPresetFoundResponse;
      const preset = presets.find((preset) => preset.name === presetName);
      if (preset !== undefined) {
        response = cloneDeep(successfulServerResponse);
        //make call to server here to update the device preset settings and name
      }
      if (response.status === "success" && preset !== undefined) {
        const nDevices = cloneDeep(devices);
        nDevices[i].preset = presetName;
        nDevices[i].settings = preset;
        setDevices(nDevices);
        return response;
      }
      return response;
    },
    [presets, devices]
  );

  const value: GlobalProps = useMemo(() => {
    return {
      modes,
      tvShown,
      presets,
      devices,
      toggleTvShown,
      addDevice,
      updateDevice,
      updateDevicePreset,
      addNewPreset,
    };
  }, [
    modes,
    tvShown,
    presets,
    devices,
    toggleTvShown,
    addDevice,
    updateDevice,
    updateDevicePreset,
    addNewPreset,
  ]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
