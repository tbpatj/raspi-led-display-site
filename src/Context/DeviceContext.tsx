import { createContext, useMemo, useState } from "react";
import { RGBStripDevice } from "../Resources/DataStructure";

interface DeviceContextProviderProps {
  initialDevice?: RGBStripDevice;
  initialPreset?: string;
  onFinish?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface DeviceProps {
  device: RGBStripDevice;
  updateDevice: (nDevice: RGBStripDevice) => void;
  preset: string;
  updatePreset: (nPreset: string) => void;
}

const defaultDevice: RGBStripDevice = {
  name: "",
  preset: "default",
  presets: {
    default: {
      type: "addressable",
      power: "off",
      image_processing: "default",
      idle_animation: "default",
      configure: {
        configured: false,
        lefts: 0,
        lefte: 0,
        rights: 0,
        righte: 0,
        tops: 0,
        tope: 0,
        bottoms: 0,
        bottome: 0,
      },
      pin_out: 18,
      brightness: 100,
    },
  },
};

export const DeviceContext = createContext<DeviceProps>({
  device: defaultDevice,
  updateDevice: () => null,
  preset: "default",
  updatePreset: () => null,
});

export const DeviceContextProvider: React.FC<DeviceContextProviderProps> = ({
  initialDevice,
  children,
  initialPreset,
}) => {
  const [device, setDevice] = useState<RGBStripDevice>(
    initialDevice ?? defaultDevice
  );
  const [preset, setPreset] = useState<string>(initialPreset ?? "default");

  const updateDevice = (nDevice: RGBStripDevice) => {
    setDevice(nDevice);
  };

  const updatePreset = (nPreset: string) => {
    setPreset(nPreset);
  };

  const value = useMemo(() => {
    return { device, updateDevice, preset, updatePreset };
  }, [device, updateDevice, preset, updatePreset]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
