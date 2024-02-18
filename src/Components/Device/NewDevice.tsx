import { useContext } from "react";
import SettingsController from "./SettingsController";
import { SettingsContext } from "../../Context/SettingsContext";

interface NewDeviceProps {
  onFinish: () => void;
}

const NewDevice: React.FC<NewDeviceProps> = ({ onFinish }) => {
  const { device, updateDevice } = useContext(SettingsContext);

  return (
    <SettingsController
      title="New Device"
      values={device}
      options={["name", "type", "pin_out", "tv_settings", "device_confirm"]}
    />
  );
};

export default NewDevice;
