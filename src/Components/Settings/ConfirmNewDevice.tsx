import { useContext, useMemo } from "react";
import { SettingsContext, StgsCnxtUpFc } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import { Device, RGBAddressableDevice } from "../../Resources/DeviceResources";
import { GlobalContext } from "../../Context/GlobalContext";

const ConfirmNewDevice = () => {
  const { data: device, update }: { data: Device; update: StgsCnxtUpFc } =
    useContext(SettingsContext);
  const { addDevice } = useContext(GlobalContext);

  const isDisabled = useMemo(() => {
    if (device.name === "") return true;
    if (
      device.type === "addressable" &&
      !(device as RGBAddressableDevice).led_count
    )
      return true;

    // return true;
    return false;
  }, [device]);

  const handleClick = () => {
    addDevice(device);
    // toggleEditingNav();
  };

  return (
    <Button disabled={isDisabled} onClick={() => handleClick()}>
      Create Device
    </Button>
  );
};

export default ConfirmNewDevice;
