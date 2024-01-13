import { useContext } from "react";
import { DeviceContext } from "../../Context/DeviceContext";
import SelectMenu from "../Input/SelectMenu";
import {
  powerOptionSelectMenu,
  typeOptionSelectMenu,
} from "./Util-OptionsSelection";
import { cloneDeep } from "lodash";
import Input from "../Input/Input";

interface OptionsControllerProps {
  option: string;
  preset?: string;
}

const OptionsController: React.FC<OptionsControllerProps> = ({
  option,
  preset = "default",
}) => {
  const { device, updateDevice } = useContext(DeviceContext);

  const updateDeviceOption = (option: string, value: any) => {
    const nDevice = cloneDeep(device);
    //@ts-ignore
    nDevice.presets[preset][option] = value;
    updateDevice(nDevice);
  };

  return (
    <div>
      {option === "power" && (
        <SelectMenu
          value="on"
          onChange={() => {
            return null;
          }}
          {...powerOptionSelectMenu}
        />
      )}
      {option === "type" && (
        <SelectMenu
          value={device.presets[preset].type}
          onChange={(value) => {
            updateDeviceOption(option, value);
          }}
          {...typeOptionSelectMenu}
        />
      )}
      {/* addressable pinout */}
      {option === "pin_out" &&
        device.presets[preset].type === "addressable" && (
          <div className="regular-container">
            <div className="regular-item-list">
              <h1>Pin Out</h1>
              <Input
                value={device.presets[preset].pin_out.toString()}
                onChange={(val: string) =>
                  updateDeviceOption(option, Number(val))
                }
              ></Input>
            </div>
          </div>
        )}
      {/* nonAddressable pinout */}
      {option === "pin_out" &&
        device.presets[preset].type === "non-addressable" && <div></div>}
      {option === "configure" && <div></div>}
      {option === "image_processing" && <div></div>}
    </div>
  );
};

export default OptionsController;
