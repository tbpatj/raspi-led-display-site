import { useContext } from "react";
import SettingsController from "./SettingsController";
import { SettingsContext } from "../../Context/SettingsContext";
import { defaultSettings } from "./SettingsControllerUtil";

interface NewDeviceProps {
  onFinish: () => void;
}

const NewDevice: React.FC<NewDeviceProps> = ({ onFinish }) => {
  const { data } = useContext(SettingsContext);

  return (
    <SettingsController
      title="New Device"
      settings={defaultSettings}
      values={data}
      options={["name", "type", "pin_out", "led_count", "device_confirm"]}
    />
  );
};

export default NewDevice;
