import { createContext, useCallback, useMemo, useState } from "react";
import { Devices } from "../Resources/DeviceResources";
import { DevicePresets, defaultPresets } from "../Resources/PresetResources";
import { ServerResponse } from "../Resources/ServerResponseResources";
import { cloneDeep } from "lodash";

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
  addDevice: (device: Devices) => Promise<ServerResponse>;
  updateDevice: (i: number, nDevice: Devices) => Promise<ServerResponse>;
  addNewPreset: (i: number, name: string) => Promise<ServerResponse>;
}

const defaultServerResponse: ServerResponse = {
  status: "error",
  message: "Context Provider was not initialized properly",
  code: 400,
};

const noCallResponse: ServerResponse = {
  status: "error",
  message: "No call was made to the server",
  code: 400,
};

const successfulServerResponse: ServerResponse = {
  status: "success",
  message: "Device added successfully",
  code: 200,
};

const defaultGlobalData = {
  tvShown: false,
  toggleTvShown: (nVal?: boolean) => null,
  presets: defaultPresets,
  devices: [],
  addDevice: async (device: Devices) => defaultServerResponse,
  updateDevice: async (i: number, nDevice: Devices) => defaultServerResponse,
  addNewPreset: async (i: number, name: string) => defaultServerResponse,
};

export const GlobalContext = createContext<GlobalProps>(defaultGlobalData);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [tvShown, setTVShown] = useState(false);
  const toggleTvShown = (nVal?: boolean) => {
    setTVShown(nVal ?? !tvShown);
  };
  const [devices, setDevices] = useState<Devices[]>([]);
  const addDevice = async (device: Devices) => {
    // do a call to the server
    const response: ServerResponse = cloneDeep(successfulServerResponse);
    //handle response and potentially push the new device to our list of devices
    if (response.status === "success") {
      const nDevices = cloneDeep(devices);
      nDevices.push(device);
      setDevices(nDevices);
      //TODO preset handler, make sure when the device gets added if there are no default presets for the device then create one.

      return response;
    } else {
      return response;
    }
  };
  const updateDevice = async (i: number, nDevice: Devices) => {
    // do a call to the server
    const response: ServerResponse = cloneDeep(successfulServerResponse);

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
  };

  const addNewPreset = async (i: number, name: string) => {
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
  };

  const [presets, setPresets] = useState<DevicePresets[]>(defaultPresets);

  const value: GlobalProps = useMemo(() => {
    return {
      tvShown,
      presets,
      devices,
      toggleTvShown,
      addDevice,
      updateDevice,
      addNewPreset,
    };
  }, [
    tvShown,
    presets,
    devices,
    toggleTvShown,
    addDevice,
    updateDevice,
    addNewPreset,
  ]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
