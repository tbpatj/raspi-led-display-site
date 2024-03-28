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
  const { devices, updateDevice } = useContext(GlobalContext);
  const [device, setDevice] = useState<Device>(defaultDevice as Device);

  const handleChange = (json: Device, items: ChangeItem[]) => {
    // if (items.findIndex((val) => val.path.includes("type")) != -1) {
    //   if (json.type === "addressable") {
    //     (json as RGBAddressableDevice)["pin_out"] = 0;
    //   } else {
    //     json["pin_out"] = { r: 0, g: 0, b: 0 };
    //   }
    // }
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
