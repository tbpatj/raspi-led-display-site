import { createContext, useMemo } from "react";

interface GlobalContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

interface GlobalProps {
  centerBackgroundItems: boolean;
  presets: any;
  devices: any;
}

export const GlobalContext = createContext<GlobalProps | undefined>(undefined);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const centerBackgroundItems = true;
  const presets: any = [];
  const devices: any = [];

  const value = useMemo(() => {
    return { centerBackgroundItems, presets, devices };
  }, [centerBackgroundItems, presets, devices]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
