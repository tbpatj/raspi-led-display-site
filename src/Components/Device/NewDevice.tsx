import { useContext, useMemo, useState } from "react";
import Input from "../Input/Input";
import DeviceSetting from "./DeviceSetting";
import { deviceOptions } from "./DeviceSettings";
import Button from "../Input/Button";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import { DeviceContext } from "../../Context/DeviceContext";
import { cloneDeep } from "lodash";
import OptionsController from "./OptionsController";
import { BaseControllerOptions } from "./OptionsControllerUtil";
import { GlobalContext } from "../../Context/GlobalContext";
interface NewDeviceProps {
  onFinish: () => void;
}

const NewDevice: React.FC<NewDeviceProps> = ({ onFinish }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState("");
  const { toggleTvShown } = useContext(GlobalContext);
  const { device, updateDevice } = useContext(DeviceContext);

  const onNameEdit = (val: string) => {
    const nDevice = cloneDeep(device);
    nDevice.name = val;
    updateDevice(nDevice);
  };

  const isButtonDisabled = useMemo(() => {
    if (device.name === "") return true;
    return false;
  }, [device]);

  const baseOptions = useMemo(() => {
    if (device.type === "addressable-tv")
      return ["type", "pin_out", "tv_settings"];
    else if (device.type === "non-addressable-tv") return ["type", "pin_out"];
    else return ["type", "pin_out"];
  }, [device]);

  const getDisplayValue = (value: any) => {
    if (typeof value === "string") return value;
    else if (typeof value === "number") return value.toString();
    else return "";
  };

  return (
    <HorizontalTransition
      onBack={() => {
        toggleTvShown(false);
        setIsEditing(false);
      }}
      id="device-settings-transition"
      selected={isEditing ? 1 : 0}
    >
      <div className="new-device-container">
        <div className="new-device-list">
          <h1>New Device</h1>
          <Input
            placeholder="Device Name"
            value={device.name}
            onChange={onNameEdit}
          ></Input>
          {baseOptions.map((option) => {
            return (
              <DeviceSetting
                key={`new-device-${option}`}
                value={getDisplayValue(device[option as keyof typeof device])}
                style={{ width: "calc(100% - 20px)" }}
                onClick={() => {
                  if (option === "tv_settings") {
                    toggleTvShown(true);
                  }
                  setIsEditing(true);
                  setEditing(option);
                }}
                title={option}
                elements={deviceOptions[option]}
              />
            );
          })}
        </div>
        <div className="new-device-button-container">
          <Button disabled={isButtonDisabled} onClick={() => null}>
            Create Device
          </Button>
        </div>
      </div>
      <div>
        <OptionsController
          options={BaseControllerOptions}
          option={editing}
        ></OptionsController>
      </div>
    </HorizontalTransition>
  );
};

export default NewDevice;
