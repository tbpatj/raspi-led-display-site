import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useJsonChange from "../Hooks/useJsonChange";
import { ChangeItem } from "../Resources/JsonChange";

interface SettingsContextProviderProps {
  initalJson: any;
  onChange: (json: any, items: ChangeItem[]) => void;
  onCommand: (json: any, command: SettingsCommand) => void;
  children: React.ReactNode | React.ReactNode[];
}

export interface SettingsCommand {
  val: string;
  data?: any;
}

export type StgsCnxtUpFc = (items: ChangeItem[]) => void;

export type StgsCnxtCmdFc = (command: SettingsCommand) => void;

interface SettingsContextProps {
  data: any;
  update: StgsCnxtUpFc;
  command: StgsCnxtCmdFc;
}

export const SettingsContext = createContext<SettingsContextProps>({
  data: {},
  update: (items: ChangeItem[]) => null,
  command: (command: SettingsCommand) => null,
});

export const SettingsContextProvider: React.FC<
  SettingsContextProviderProps
> = ({ initalJson, children, onChange, onCommand }) => {
  const [data, setData] = useState(initalJson);

  const { update } = useJsonChange({
    json: data,
    onChange: onChange,
  });

  const command = useCallback(
    (command: SettingsCommand) => {
      onCommand(data, command);
    },
    [data]
  );

  useEffect(() => {
    setData(initalJson);
  }, [initalJson]);

  const value = useMemo(() => {
    return {
      data,
      update,
      command,
    };
  }, [data, update, command]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
