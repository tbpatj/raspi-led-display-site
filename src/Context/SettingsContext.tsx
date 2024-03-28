import { createContext, useEffect, useMemo, useState } from "react";
import useJsonChange from "../Hooks/useJsonChange";
import { ChangeItem } from "../Resources/JsonChange";

interface SettingsContextProviderProps {
  initalJson: any;
  onChange: (json: any) => void;
  onCommand: (command: any) => void;
  children: React.ReactNode | React.ReactNode[];
}

export type StgsCnxtUpFc = (items: ChangeItem[]) => void;

interface SettingsContextProps {
  data: any;
  update: StgsCnxtUpFc;
}

export const SettingsContext = createContext<SettingsContextProps>({
  data: {},
  update: (items: ChangeItem[]) => null,
});

export const SettingsContextProvider: React.FC<
  SettingsContextProviderProps
> = ({ initalJson, children, onChange }) => {
  const [data, setData] = useState(initalJson);

  const { update } = useJsonChange({
    json: data,
    onChange: onChange,
  });

  useEffect(() => {
    setData(initalJson);
  }, [initalJson]);

  const value = useMemo(() => {
    return {
      data,
      update,
    };
  }, [data, update]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
