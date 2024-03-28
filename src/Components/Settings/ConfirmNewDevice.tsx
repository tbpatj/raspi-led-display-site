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

  const handleClick = async () => {
    const response = await command({ val: "new-device" });
    if (response.status === "success") {
      command({ val: "toggle-nav" });
    }
  };

  return (
    <Button disabled={isDisabled} onClick={() => handleClick()}>
      Create Device
    </Button>
  );
};

export default ConfirmNewDevice;
