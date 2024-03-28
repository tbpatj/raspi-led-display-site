import { useContext, useMemo } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import SelectMenu from "../Input/SelectMenu";
import { SettingsControllerList } from "./SettingsControllerUtil";
import Input from "../Input/Input";
import MenuContainer from "./MenuContainer";
import { ChangeItem, getJsonValue } from "../../Resources/JsonChange";
import { clientFailureResponse } from "../../Resources/ServerResponseResources";

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

  const optionDetails = useMemo(() => {
    return options?.[option] ?? "none";
  }, [option, options]);

  const updateValues = async (option: string, value: any) => {
    let nUpdate: ChangeItem = { path: [option], value: value };
    if (optionDetails?.path) {
      nUpdate.path = [...optionDetails.path, option];
    }
    const override = optionDetails?.overrideChanges?.(nUpdate);
    let response = clientFailureResponse;
    if (override) {
      response = await update([nUpdate, ...override]);
    } else {
      response = await update([nUpdate]);
    }
    if (response.status === "error") {
      //handle errors when needed
    }
  };

  const optionValue = useMemo(() => {
    //make sure to return the actual value if it utilizes a path
    if (optionDetails?.path) {
      const test = getJsonValue(data, [...(optionDetails?.path ?? []), option]);
      return test;
    } else {
      return data?.[option];
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
