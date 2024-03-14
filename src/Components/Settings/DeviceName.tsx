import { useContext } from "react";
import Input from "../Input/Input";
import { SettingsContext } from "../../Context/SettingsContext";

const DeviceName: React.FC = () => {
  const { device, updateDevice } = useContext(SettingsContext);

  const handleNameChange = (val: string) => {
    const nDevice = { ...device };
    nDevice.name = val;
    nDevice.settings.device_name = val;
    updateDevice(nDevice);
  };

  return (
    <Input
      onChange={handleNameChange}
      value={device.name}
      placeholder="Device Name"
      id="device-name"
    />
  );
};

export default DeviceName;
