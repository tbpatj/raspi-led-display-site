import { createContext, useMemo, useState } from "react";

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
  presets: any;
  devices: any;
}

const defaultGlobalData = {
  tvShown: false,
  toggleTvShown: (nVal?: boolean) => null,
  presets: [],
  devices: [],
};

export const GlobalContext = createContext<GlobalProps>(defaultGlobalData);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [tvShown, setTVShown] = useState(false);
  const toggleTvShown = (nVal?: boolean) => {
    setTVShown(nVal ?? !tvShown);
  };

  const presets: any = [];
  const devices: any = [];

  const value = useMemo(() => {
    return {
      tvShown,
      presets,
      devices,
      toggleTvShown,
    };
  }, [tvShown, presets, devices, toggleTvShown]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
