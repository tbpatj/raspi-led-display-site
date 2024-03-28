import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useJsonChange from "../Hooks/useJsonChange";
import { ChangeItem } from "../Resources/JsonChange";
import { ServerResponse } from "../Resources/ServerResponseResources";
import { defaultServerResponse } from "./GlobalContext";

interface SettingsContextProviderProps {
  initalJson: any;
  onChange: (json: any, items: ChangeItem[]) => Promise<ServerResponse>;
  onCommand: (json: any, command: SettingsCommand) => Promise<ServerResponse>;
  children: React.ReactNode | React.ReactNode[];
}

export interface SettingsCommand {
  val: string;
  data?: any;
}

export type StgsCnxtUpFc = (items: ChangeItem[]) => Promise<ServerResponse>;

export type StgsCnxtCmdFc = (
  command: SettingsCommand
) => Promise<ServerResponse>;

interface SettingsContextProps {
  data: any;
  update: StgsCnxtUpFc;
  command: StgsCnxtCmdFc;
}

export const SettingsContext = createContext<SettingsContextProps>({
  data: {},
  update: async (items: ChangeItem[]) => defaultServerResponse,
  command: async (command: SettingsCommand) => defaultServerResponse,
});

export const SettingsContextProvider: React.FC<
  SettingsContextProviderProps
> = ({ initalJson, children, onChange, onCommand }) => {
  const [data, setData] = useState(initalJson);

  const { update } = useJsonChange({
    json: data,
    onChange: onChange,
  });

  // const command = useCallback(async
  //   (command: SettingsCommand) => {
  //     // await onCommand(data, command);
  //     return Promise.resolve(defaultServerResponse);
  //   },
  //   [data]
  // );

  const command = useCallback(
    async (command: SettingsCommand) => {
      return await onCommand(data, command);
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
