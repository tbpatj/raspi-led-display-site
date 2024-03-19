import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import Input from "../Input/Input";
import {
  RGBAddressableDevice,
  RGBNonAddressableDevice,
} from "../../Resources/DeviceResources";

const PinOut: React.FC = () => {
  const { device, updateDevice } = useContext(SettingsContext);

  const onAddressablePinOutChange = (val: string) => {
    const isValid = /^[0-9]+$/.test(val);
    if (isValid || val === "") {
      if (val === "") val = "0";
      if (device.type === "addressable") {
        const nDevice = { ...device } as RGBAddressableDevice;
        nDevice.pin_out = parseInt(val);
        updateDevice(nDevice);
      }
    }
  };

  const onNonAddressablePinOutChange =
    (type: "r" | "g" | "b") => (val: string) => {
      const isValid = /^[0-9]+$/.test(val);
      if (isValid || val === "") {
        if (val === "") val = "0";
        if (device.type === "non-addressable") {
          const nDevice = { ...device } as RGBNonAddressableDevice;
          const pin_out = (nDevice as RGBNonAddressableDevice).pin_out;
          if (typeof pin_out === "number")
            nDevice.pin_out = { r_pin: 0, g_pin: 0, b_pin: 0 };
          nDevice.pin_out[(type + "_pin") as keyof typeof pin_out] =
            parseInt(val);
          updateDevice(nDevice);
        }
      }
    };

  return (
    <div className="select-menu-container">
      <div className="new-device-list">
        {device.type === "addressable" && (
          <Input
            onChange={onAddressablePinOutChange}
            value={(device as RGBAddressableDevice).pin_out}
          ></Input>
        )}
        {device.type === "non-addressable" && (
          <div>
            <div>R Pin</div>
            <Input
              onChange={onNonAddressablePinOutChange("r")}
              value={(device as RGBNonAddressableDevice).pin_out.r_pin}
            ></Input>
            <div>G Pin</div>
            <Input
              onChange={onNonAddressablePinOutChange("g")}
              value={(device as RGBNonAddressableDevice).pin_out.g_pin}
            ></Input>
            <div>B Pin</div>
            <Input
              onChange={onNonAddressablePinOutChange("b")}
              value={(device as RGBNonAddressableDevice).pin_out.b_pin}
            ></Input>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinOut;
