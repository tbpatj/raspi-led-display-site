import { createContext, useMemo, useState } from "react";
import { Devices } from "../Resources/DeviceResources";

interface DeviceContextProviderProps {
  initialDevice?: Devices;
  onFinish?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface DeviceProps {
  device: Devices;
  updateDevice: (nDevice: Devices) => void;
  saveDevice: () => void;
}

const defaultDevice: Devices = {
  name: "",
  preset: "default",
  type: "addressable",
  pin_out: 0,
};

export const DeviceContext = createContext<DeviceProps>({
  device: defaultDevice,
  updateDevice: () => null,
  saveDevice: () => null,
});

export const DeviceContextProvider: React.FC<DeviceContextProviderProps> = ({
  initialDevice,
  children,
}) => {
  const [device, setDevice] = useState<Devices>(initialDevice ?? defaultDevice);

  const updateDevice = (nDevice: Devices) => {
    setDevice(nDevice);
  };

  const saveDevice = () => {};

  const value = useMemo(() => {
    return { device, updateDevice, saveDevice };
  }, [device, updateDevice, saveDevice]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
