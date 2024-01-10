import { createContext, useMemo } from "react";

interface DeviceContextProviderProps {
  device: any;
  onFinish: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface DeviceProps {
  device: any;
}

export const DeviceContext = createContext<DeviceProps | undefined>(undefined);

export const DeviceContextProvider: React.FC<DeviceContextProviderProps> = ({
  children,
}) => {
  const device: any = {};

  const value = useMemo(() => {
    return { device };
  }, [device]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
