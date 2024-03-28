import { useContext, useMemo } from "react";
import { SettingsContext, StgsCnxtCmdFc } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import { Device, RGBAddressableDevice } from "../../Resources/DeviceResources";

const ConfirmNewDevice = () => {
  const { data: device, command }: { data: Device; command: StgsCnxtCmdFc } =
    useContext(SettingsContext);

  const isDisabled = useMemo(() => {
    if (device?.name === "") return true;
    if (
      device?.type === "addressable" &&
      !(device as RGBAddressableDevice).led_count
    )
      return true;

    // return true;
    return false;
  }, [device]);

  const handleClick = () => {
    command({ val: "new-device" });
    // toggleEditingNav();
  };

  return (
    <Button disabled={isDisabled} onClick={() => handleClick()}>
      Create Device
    </Button>
  );
};

export default ConfirmNewDevice;
