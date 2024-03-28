import { useContext } from "react";
import Input from "../Input/Input";
import { SettingsContext, StgsCnxtUpFc } from "../../Context/SettingsContext";
import { Device } from "../../Resources/DeviceResources";

const DeviceName: React.FC = () => {
  const { data: device, update }: { data: Device; update: StgsCnxtUpFc } =
    useContext(SettingsContext);

  const handleNameChange = (val: string) => {
    const nDevice = { ...device };
    nDevice.name = val;
    nDevice.settings.device_name = val;
    update([
      { path: ["name"], value: val },
      { path: ["settings", "device_name"], value: val },
    ]);
  };

  return (
    <Input
      onChange={handleNameChange}
      value={device?.name}
      placeholder="Device Name"
      id="device-name"
    />
  );
};

export default DeviceName;
