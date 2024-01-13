import { createContext, useMemo, useState } from "react";
import { RGBStripDevice } from "../Resources/DataStructure";

interface DeviceContextProviderProps {
  initialDevice?: RGBStripDevice;
  onFinish?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface DeviceProps {
  device: RGBStripDevice;
  updateDevice: (nDevice: RGBStripDevice) => void;
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
});

export const DeviceContextProvider: React.FC<DeviceContextProviderProps> = ({
  initialDevice,
  children,
}) => {
  const [device, setDevice] = useState<RGBStripDevice>(
    initialDevice ?? defaultDevice
  );

  const updateDevice = (nDevice: RGBStripDevice) => {
    setDevice(nDevice);
  };

  const value = useMemo(() => {
    return { device, updateDevice };
  }, [device, updateDevice]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
