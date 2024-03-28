import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  SettingsCommand,
  SettingsContextProvider,
} from "../../Context/SettingsContext";
import DeviceControllerContainer from "./DeviceControllerContainer";
import { Device } from "../../Resources/DeviceResources";
import { ChangeItem } from "../../Resources/JsonChange";
import { clientFailureResponse } from "../../Resources/ServerResponseResources";

interface DeviceEditorProps {
  index: number;
}

const DeviceEditor: React.FC<DeviceEditorProps> = ({ index }) => {
  const { devices, updateDevice, addNewPreset } = useContext(GlobalContext);
  const handleChange = async (json: Device, items: ChangeItem[]) => {
    //if the update is part of the settings, then we know we are updating what potentially is the preset, so we need to make it a custom preset
    if (
      devices[index].preset === json.preset &&
      items.findIndex((item) => item.path[0] === "settings") !== -1
    ) {
      json.preset = "custom";
    }
    return await updateDevice(index, json);
  };

  const handleCommand = async (json: Device, command: SettingsCommand) => {
    if (command.val === "save-preset" && command?.data?.name) {
      return await addNewPreset(index, command?.data?.name);
    }
    return clientFailureResponse;
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <SettingsContextProvider
        initalJson={devices[index]}
        onChange={handleChange}
        onCommand={handleCommand}
      >
        <DeviceControllerContainer />
      </SettingsContextProvider>
    </div>
  );
};

export default DeviceEditor;
