import { useContext, useMemo } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import SelectMenu from "../Input/SelectMenu";
import { cloneDeep } from "lodash";
import { SettingsControllerList } from "./SettingsControllerUtil";
import Input from "../Input/Input";

interface InputControllerProps {
  options: SettingsControllerList;
  option: string;
  preset?: string;
}

const InputController: React.FC<InputControllerProps> = ({
  option,
  options,
}) => {
  const { device, preset, updateDevice, updatePreset, updateDevicePreset } =
    useContext(SettingsContext);

  const updateDeviceOption = async (option: string, value: any) => {
    const nDevice = cloneDeep(device);
    //@ts-ignore
    nDevice[option] = value;
    // if (option === "preset") {
    //   await updateDevicePreset(value);
    // } else {
    await updateDevice(nDevice);
    // }
  };

  const updatePresetOption = (option: string, value: any) => {
    const nPreset = cloneDeep(preset);
    //@ts-ignore
    nPreset[option] = value;
    updatePreset(nPreset);
  };

  const updateValues = (option: string, value: any) => {
    if (optionDetails.dataType === "device") {
      updateDeviceOption(option, value);
    } else if (optionDetails.dataType === "preset") {
      updatePresetOption(option, value);
    }
  };

  const optionDetails = useMemo(() => {
    return options?.[option] ?? "none";
  }, [option, options]);

  const optionValue = useMemo(() => {
    //make sure to return the actual value if it is from the preset or the device
    if (optionDetails.dataType === "device") {
      return device?.[option as keyof typeof device] ?? undefined;
    } else if (optionDetails.dataType === "preset") {
      //return the current settings preset value from the device
      return (
        device?.settings?.[option as keyof typeof device.settings] ?? undefined
      );
    }
    return "none";
  }, [option, device]);

  const displayValue = useMemo(() => {
    if (optionValue !== undefined && optionValue !== null) {
      if (typeof optionValue === "string") return optionValue;
      else if (typeof optionValue === "number") {
        //@ts-ignore
        return optionValue.toString();
      } else return "";
    }
    return ""; // Add a default return value for other cases
  }, [optionValue]);
  return (
    <div>
      {optionDetails.type === "select" && (
        <SelectMenu
          // @ts-ignore
          value={displayValue}
          onChange={(val: string) => {
            updateValues(option, val);
          }}
          title={optionDetails?.title}
          type={device.type}
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
              onChange={(val: string) => updateValues(option, val)}
              id={optionDetails?.id}
            ></Input>
          </div>
        </div>
      )}
      {optionDetails.type === "number" && (
        <div className="regular-container">
          <div className="regular-item-list">
            {optionDetails?.title && <h1>{optionDetails.title}</h1>}
            <Input
              value={displayValue}
              onChange={(val: string) => {
                const isValid = /^[0-9]+$/.test(val);
                if (isValid || val === "") {
                  if (val === "") val = "0";
                  updateValues(option, Number(val));
                }
              }}
              id={optionDetails?.id}
            ></Input>
          </div>
        </div>
      )}
      {optionDetails.type === "custom-input" && <>{optionDetails.element}</>}
    </div>
  );
};

export default InputController;
