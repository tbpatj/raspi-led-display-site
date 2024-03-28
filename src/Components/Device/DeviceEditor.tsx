import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { SettingsContextProvider } from "../../Context/SettingsContext";
import DeviceControllerContainer from "./DeviceControllerContainer";
import { Device } from "../../Resources/DeviceResources";
import { ChangeItem } from "../../Resources/JsonChange";

interface DeviceEditorProps {
  index: number;
}

const DeviceEditor: React.FC<DeviceEditorProps> = ({ index }) => {
  const { devices, updateDevice } = useContext(GlobalContext);
  const handleChange = (json: Device, items: ChangeItem[]) => {
    //if the update is part of the settings, then we know we are updating what potentially is the preset, so we need to make it a custom preset
    if (
      devices[index].preset === json.preset &&
      items.findIndex((item) => item.path[0] === "settings") !== -1
    ) {
      json.preset = "custom";
    }
    updateDevice(index, json);
  };
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <SettingsContextProvider
        initalJson={devices[index]}
        onChange={handleChange}
        onCommand={() => null}
      >
        <DeviceControllerContainer />
      </SettingsContextProvider>
    </div>
  );
};

export default DeviceEditor;
