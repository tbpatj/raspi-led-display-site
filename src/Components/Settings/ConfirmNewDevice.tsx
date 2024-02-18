import { useContext, useMemo } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import { RGBAddressableDevice } from "../../Resources/DeviceResources";
import { GlobalContext } from "../../Context/GlobalContext";

const ConfirmNewDevice = () => {
  const { device, updateDevice, toggleEditingNav } =
    useContext(SettingsContext);
  const { addDevice } = useContext(GlobalContext);

  const isDisabled = useMemo(() => {
    if (device.name === "") return true;

    // return true;
    return false;
  }, [device]);

  const handleClick = () => {
    addDevice(device);
    toggleEditingNav();
  };

  return (
    <Button disabled={isDisabled} onClick={() => handleClick()}>
      Create Device
    </Button>
  );
};

export default ConfirmNewDevice;
