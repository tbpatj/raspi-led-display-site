import { useContext } from "react";
import { SettingsContext, StgsCnxtUpFc } from "../../Context/SettingsContext";
import Input from "../Input/Input";
import {
  Device,
  RGBAddressableDevice,
  RGBNonAddressableDevice,
} from "../../Resources/DeviceResources";

const PinOut: React.FC = () => {
  const { data: device, update }: { data: Device; update: StgsCnxtUpFc } =
    useContext(SettingsContext);

  const onAddressablePinOutChange = (val: string) => {
    const isValid = /^[0-9]+$/.test(val);
    if (isValid || val === "") {
      if (val === "") val = "0";
      if (device.type === "addressable") {
        update([{ path: ["pin_out"], value: parseInt(val) }]);
      }
    }
  };

  const onNonAddressablePinOutChange =
    (type: "r" | "g" | "b") => (val: string) => {
      const isValid = /^[0-9]+$/.test(val);
      if (isValid || val === "") {
        if (val === "") val = "0";
        if (device.type === "non-addressable") {
          let pin_out = (device as RGBNonAddressableDevice).pin_out;
          if (typeof pin_out === "number")
            pin_out = { r_pin: 0, g_pin: 0, b_pin: 0 };
          pin_out[(type + "_pin") as keyof typeof pin_out] = parseInt(val);
          update([{ path: ["pin_out"], value: pin_out }]);
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
