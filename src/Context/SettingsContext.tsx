import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Devices } from "../Resources/DeviceResources";
import { DevicePresets } from "../Resources/PresetResources";
import { cloneDeep } from "lodash";
import { GlobalContext } from "./GlobalContext";

interface SettingsContextProviderProps {
  selectedDevice?: number;
  initialPreset?: DevicePresets;
  setEditingOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface SettingsContextProps {
  device: Devices;
  preset: DevicePresets;
  updateDevice: (nDevice: Devices) => void;
  updatePreset: (nPreset: DevicePresets) => void;
  saveDevice: () => void;
  toggleEditingNav: () => void;
}

const defaultDevice: Devices = {
  name: "",
  preset: "default",
  type: "addressable",
  pin_out: 0,
  settings: {
    name: "default",
    power: "off",
    type: "addressable",
    mode: "breathe",
  },
};

const defaultPreset: DevicePresets = {
  name: "default",
  power: "off",
  type: "addressable",
  mode: "breathe",
};

export const SettingsContext = createContext<SettingsContextProps>({
  device: defaultDevice,
  preset: defaultPreset,
  updateDevice: () => null,
  updatePreset: () => null,
  saveDevice: () => null,
  toggleEditingNav: () => null,
});

export const SettingsContextProvider: React.FC<
  SettingsContextProviderProps
> = ({ selectedDevice, initialPreset, children, setEditingOpen }) => {
  const { devices, updateDevice: globalUpdateDevice } =
    useContext(GlobalContext);
  const [device, setDevice] = useState<Devices>(
    selectedDevice !== undefined && selectedDevice !== null
      ? devices?.[selectedDevice] ?? defaultDevice
      : defaultDevice
  );
  const [preset, setPreset] = useState<DevicePresets>(
    initialPreset ?? defaultPreset
  );

  useEffect(() => {
    setDevice(
      selectedDevice !== undefined && selectedDevice !== null
        ? devices?.[selectedDevice] ?? defaultDevice
        : defaultDevice
    );
  }, [selectedDevice]);

  useEffect(() => {
    setPreset(initialPreset ?? defaultPreset);
  }, [initialPreset]);

  const updateDevice = async (nDevice: Devices) => {
    //update the client if successful
    if (
      selectedDevice !== undefined &&
      selectedDevice !== null &&
      devices?.[selectedDevice]
    ) {
      const response = await globalUpdateDevice(selectedDevice, nDevice);
      if (response.status === "success") setDevice(nDevice);
    } else {
      setDevice(nDevice);
    }
  };

  const updatePreset = async (nPreset: DevicePresets) => {
    const nDevice = cloneDeep(device);
    nDevice.settings = nPreset;
    //make sure the device is now on it's own custom preset, since we changed the data of the preset currently
    nDevice.preset = "custom";
    nDevice.settings.name = "custom";
    nPreset.name = "custom";
    if (
      selectedDevice !== undefined &&
      selectedDevice !== null &&
      devices?.[selectedDevice]
    ) {
      const response = await globalUpdateDevice(selectedDevice, nDevice);
      if (response.status === "success") {
        setDevice(nDevice);
        setPreset(nPreset);
      }
    } else {
      setDevice(nDevice);
      setPreset(nPreset);
    }
  };

  const toggleEditingNav = useCallback(() => {
    setEditingOpen?.((val) => !val);
  }, [setEditingOpen]);

  const saveDevice = () => {};

  const value = useMemo(() => {
    return {
      device,
      preset,
      updateDevice,
      updatePreset,
      saveDevice,
      toggleEditingNav,
    };
  }, [
    device,
    preset,
    updateDevice,
    updatePreset,
    saveDevice,
    toggleEditingNav,
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
