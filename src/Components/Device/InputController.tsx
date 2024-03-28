import { useContext, useMemo } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import SelectMenu from "../Input/SelectMenu";
import { cloneDeep } from "lodash";
import { SettingsControllerList } from "./SettingsControllerUtil";
import Input from "../Input/Input";
import MenuContainer from "./MenuContainer";
import { getJsonValue } from "../../Resources/JsonChange";

interface InputControllerProps {
  options: SettingsControllerList;
  option: string;
  preset?: string;
}

const InputController: React.FC<InputControllerProps> = ({
  option,
  options,
}) => {
  const { data, update } = useContext(SettingsContext);

  // const updateDeviceOption = async (option: string, value: any) => {

  //   // let nDevice = cloneDeep(device);
  //   // nDevice[option as keyof typeof nDevice] = value;
  //   // const nDevice2 = options[option]?.overrideChanges?.(nDevice);
  //   // if (nDevice2) {
  //   //   nDevice = nDevice2;
  //   // }
  //   // // if (option === "preset") {
  //   // //   await updateDevicePreset(value);
  //   // // } else {
  //   // await updateDevice(nDevice);
  //   // // }
  // };

  // const updatePresetOption = (option: string, value: any) => {
  //   const nPreset = cloneDeep(preset);
  //   //@ts-ignore
  //   nPreset[option] = value;
  //   updatePreset(nPreset);
  // };

  // const updateValues = (option: string, value: any) => {
  //   if (optionDetails.dataType === "device") {
  //     updateDeviceOption(option, value);
  //   } else if (optionDetails.dataType === "preset") {
  //     updatePresetOption(option, value);
  //   }
  // };

  const optionDetails = useMemo(() => {
    return options?.[option] ?? "none";
  }, [option, options]);

  const updateValues = (option: string, value: any) => {
    if (optionDetails?.path) {
      update([{ path: [...optionDetails.path, option], value: value }]);
    } else {
      update([{ path: [option], value: value }]);
    }
  };

  const optionValue = useMemo(() => {
    //make sure to return the actual value if it is from the preset or the device
    console.log(data, optionDetails.path, option);
    if (optionDetails?.path) {
      console.log("checking");

      const test = getJsonValue(data, [...(optionDetails?.path ?? []), option]);
      console.log(test);
      return test;
    } else {
      return data[option];
    }
  }, [option, data]);

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
          type={data?.type}
          id={optionDetails?.id}
          options={optionDetails.options}
        />
      )}
      {optionDetails.type === "text" && (
        <MenuContainer option={optionDetails}>
          <Input
            className="input-menu"
            value={displayValue}
            onChange={(val: string) => updateValues(option, val)}
            id={optionDetails?.id}
          ></Input>
        </MenuContainer>
      )}
      {optionDetails.type === "number" && (
        <MenuContainer option={optionDetails}>
          <Input
            className="input-menu"
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
        </MenuContainer>
      )}
      {optionDetails.type === "custom-input" && <>{optionDetails.element}</>}
    </div>
  );
};

export default InputController;
