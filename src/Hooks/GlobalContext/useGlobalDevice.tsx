import { useCallback, useState } from "react";
import { Devices } from "../../Resources/DeviceResources";
import {
  serverNotFoundResponse,
  successfulServerResponse,
} from "../../Context/GlobalContext";
import axios from "axios";
import { cloneDeep } from "lodash";
import { ServerResponse } from "../../Resources/ServerResponseResources";
import { DevicePresets, defaultPresets } from "../../Resources/PresetResources";

interface GlobalDeviceProps {}

interface GlobalDeviceHook {
  devices: Devices[];
  presets: DevicePresets[];
  getDevices: () => Promise<void>;
  getPresets: () => Promise<void>;
  updateDevice: (i: number, nDevice: Devices) => Promise<ServerResponse>;
  deleteDevice: (i: number) => Promise<ServerResponse>;
  addDevice: (device: Devices) => Promise<ServerResponse>;
  addNewPreset: (i: number, name: string) => Promise<ServerResponse>;
  updateDevicePreset: (
    i: number,
    presetName: string
  ) => Promise<ServerResponse>;
}

const noPresetFoundResponse: ServerResponse = {
  status: "error",
  message: "No preset found",
  code: 404,
};

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const useGlobalDevice: (
  props: GlobalDeviceProps
) => GlobalDeviceHook = ({}) => {
  const [devices, setDevices] = useState<Devices[]>([]);
  const [presets, setPresets] = useState<DevicePresets[]>(defaultPresets);

  const getDevices = useCallback(async () => {
    const options = {
      method: "GET",
      url: baseURL + "/devices",
    };
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      response = response.data;
    } catch (e) {
      console.error(e);
    }
    if (response.status === "success") {
      setDevices(response.data);
    }
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

        //when you add a device you need to create default preset
        const nPresets = cloneDeep(presets);
        const preset = cloneDeep(device.settings);
        preset.name = "default";
        nPresets.push(preset);
        setPresets(nPresets);
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
        //TODO preset handler, make sure when the device gets added if there are no default presets for the device then create one.

        return response;
      } else {
        return response;
      }
    },
    [devices]
  );

  const deleteDevice = useCallback(
    async (i: number) => {
      const device = devices[i];
      const options = {
        method: "DELETE",
        data: { type: device.type },
        url: `${baseURL}/devices/delete/${device.name}`,
      };
      let response =
        process.env.REACT_APP_DEV_MODE == "false"
          ? serverNotFoundResponse
          : successfulServerResponse;
      try {
        response = await axios(options);
        response = response.data;
        if (response.status === "success") {
          getDevices();
          getPresets();
        }
      } catch (e) {
        console.error(e);
      }
      return response;
    },
    [devices]
  );

  //------ preset functions ------

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

  const addNewPreset = useCallback(
    async (i: number, name: string) => {
      //call to the server
      const nDevice = cloneDeep(devices[i]);
      nDevice.preset = name;
      nDevice.settings.name = name;
      nDevice.settings.device_name = nDevice.name;
      nDevice.settings.device_type = nDevice.type;
      const options = {
        method: "POST",
        data: nDevice,
        url: `${baseURL}/presets`,
      };
      let response =
        process.env.REACT_APP_DEV_MODE == "false"
          ? serverNotFoundResponse
          : successfulServerResponse;
      try {
        response = await axios(options);
        response = response.data;
      } catch (e) {
        console.error(e);
      }
      if (response.status === "success") {
        //update the presets list
        const nPresets = cloneDeep(presets);
        const presetI = presets.findIndex(
          (preset) =>
            preset.name === name &&
            preset.device_type === nDevice.type &&
            preset.device_name === nDevice.name
        );

        if (presetI !== -1) {
          //a preset of that device already exists
          nPresets[presetI] = nDevice.settings;
          //call to server to update existing preset
          response = cloneDeep(successfulServerResponse);
        } else {
          //create a new preset
          nPresets.push(nDevice.settings);
          //call to server to add a new preset
          response = cloneDeep(successfulServerResponse);
        }
        setPresets(nPresets);

        //update the device specifically
        const nDevices = cloneDeep(devices);
        nDevices[i] = nDevice;
        setDevices(nDevices);
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

  return {
    devices,
    presets,
    getDevices,
    getPresets,
    addDevice,
    updateDevice,
    deleteDevice,
    addNewPreset,
    updateDevicePreset,
  };
};

export default useGlobalDevice;
