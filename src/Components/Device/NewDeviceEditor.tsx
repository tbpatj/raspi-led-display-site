import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  SettingsCommand,
  SettingsContextProvider,
} from "../../Context/SettingsContext";
import { Device, RGBAddressableDevice } from "../../Resources/DeviceResources";
import { ChangeItem } from "../../Resources/JsonChange";
import SettingsController from "./SettingsController";
import { defaultSettings } from "./SettingsControllerUtil";
import {
  clientFailureResponse,
  clientSuccessResponse,
} from "../../Resources/ServerResponseResources";

interface NewDeviceEditorProps {
  onFinish: () => void;
}

const defaultDevice: RGBAddressableDevice = {
  name: "",
  type: "addressable",
  pin_out: 0,
  led_count: 0,
  preset: "default",
  settings: {
    name: "default",
    mode: "default",
    type: "addressable",
    device_name: "",
    power: "off",
    device_type: "addressable",
    animation_speed: 1000,
    mapping: [{ ledSIndx: 0, ledEIndx: 0, mapSIndx: 0, mapEIndx: 0 }],
  },
  transition_speed: 1000,
};

const NewDeviceEditor: React.FC<NewDeviceEditorProps> = ({ onFinish }) => {
  const { addDevice } = useContext(GlobalContext);
  const [device, setDevice] = useState<Device>(defaultDevice as Device);

  const handleChange = async (json: Device, items: ChangeItem[]) => {
    setDevice(json);
    return clientSuccessResponse;
  };

  const handleCommand = async (json: Device, command: SettingsCommand) => {
    if (command.val === "new-device") {
      //create new device
      return await addDevice(json);
    }
    if (command.val === "toggle-nav") {
      onFinish();
    }
    return clientFailureResponse;
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
