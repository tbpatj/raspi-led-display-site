import { createContext, useMemo, useState } from "react";
import { Devices } from "../Resources/DeviceResources";
import { DevicePresets } from "../Resources/PresetResources";

interface SettingsContextProviderProps {
  initialDevice?: Devices;
  initialPreset?: DevicePresets;
  onFinish?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface SettingsContextProps {
  device: Devices;
  preset: DevicePresets;
  updateDevice: (nDevice: Devices) => void;
  updatePreset: (nPreset: DevicePresets) => void;
  saveDevice: () => void;
}

const defaultDevice: Devices = {
  name: "",
  preset: "default",
  type: "addressable",
  pin_out: 0,
};

const defaultPreset: DevicePresets = {
  name: "default",
  power: "off",
  type: "addressable",
};

export const SettingsContext = createContext<SettingsContextProps>({
  device: defaultDevice,
  preset: defaultPreset,
  updateDevice: () => null,
  updatePreset: () => null,
  saveDevice: () => null,
});

export const SettingsContextProvider: React.FC<
  SettingsContextProviderProps
> = ({ initialDevice, initialPreset, children }) => {
  const [device, setDevice] = useState<Devices>(initialDevice ?? defaultDevice);
  const [preset, setPreset] = useState<DevicePresets>(
    initialPreset ?? defaultPreset
  );

  const updateDevice = (nDevice: Devices) => {
    setDevice(nDevice);
  };

  const updatePreset = (nPreset: DevicePresets) => {
    setPreset(nPreset);
  };

  const saveDevice = () => {};

  const value = useMemo(() => {
    return { device, preset, updateDevice, updatePreset, saveDevice };
  }, [device, preset, updateDevice, updatePreset, saveDevice]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
