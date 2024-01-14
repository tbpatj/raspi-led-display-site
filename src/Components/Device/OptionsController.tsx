import { useContext, useMemo } from "react";
import { DeviceContext } from "../../Context/DeviceContext";
import SelectMenu from "../Input/SelectMenu";
import { cloneDeep } from "lodash";
import { ControllerOptions } from "./OptionsControllerUtil";
import Input from "../Input/Input";

interface OptionsControllerProps {
  options: ControllerOptions;
  option: string;
  preset?: string;
}

const OptionsController: React.FC<OptionsControllerProps> = ({
  option,
  preset = "default",
  options,
}) => {
  const { device, updateDevice } = useContext(DeviceContext);

  const updateDeviceOption = (option: string, value: any) => {
    const nDevice = cloneDeep(device);
    //@ts-ignore
    nDevice.presets[preset][option] = value;
    updateDevice(nDevice);
  };

  const optionDetails = useMemo(() => {
    return options?.[option] ?? "none";
  }, [option, options]);

  const optionValue = useMemo(() => {
    //@ts-ignore
    return device.presets?.[preset]?.[option] ?? undefined;
  }, [option, preset, device]);

  const displayValue = useMemo(() => {
    if (typeof optionValue === "string") return optionValue;
    else if (typeof optionValue === "number") return optionValue.toString();
    else return "";
  }, [optionValue]);

  return (
    <div>
      {optionDetails.type === "select" && (
        <SelectMenu
          // @ts-ignore
          value={displayValue}
          onChange={(val: string) => {
            updateDeviceOption(option, val);
          }}
          title={optionDetails?.title}
          id={optionDetails?.id}
          options={optionDetails.options}
        />
      )}
      {optionDetails.type === "text" && (
        <div className="regular-container">
          <div className="regular-item-list">
            {optionDetails?.title && <h1>{optionDetails.title}</h1>}
            <Input
              value={displayValue}
              onChange={(val: string) =>
                updateDeviceOption(option, Number(val))
              }
              id={optionDetails?.id}
            ></Input>
          </div>
        </div>
      )}
      {optionDetails.type === "custom" && <>{optionDetails.element}</>}
    </div>
  );
};

export default OptionsController;
