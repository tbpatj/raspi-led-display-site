import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  SettingsCommand,
  SettingsContextProvider,
} from "../../Context/SettingsContext";
import { Device } from "../../Resources/DeviceResources";
import { ChangeItem } from "../../Resources/JsonChange";
import SettingsController from "./SettingsController";
import { defaultSettings } from "./SettingsControllerUtil";

interface NewDeviceEditorProps {
  onFinish: () => void;
}

const NewDeviceEditor: React.FC<NewDeviceEditorProps> = ({ onFinish }) => {
  const { devices, updateDevice } = useContext(GlobalContext);
  const [device, setDevice] = useState<Device>();

  const handleChange = (json: Device, items: ChangeItem[]) => {
    setDevice(json);
  };

  const handleCommand = (json: Device, command: SettingsCommand) => {
    if (command.val === "new-device") {
      //create new device
      onFinish();
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <SettingsContextProvider
        initalJson={device}
        onChange={handleChange}
        onCommand={handleCommand}
      >
        <SettingsController
          title="New Device"
          settings={defaultSettings}
          options={["name", "type", "pin_out", "led_count", "device_confirm"]}
        />
      </SettingsContextProvider>
    </div>
  );
};

export default NewDeviceEditor;
