import { useContext, useState } from "react";
import { defaultSettings } from "./SettingsControllerUtil";
import SettingItem from "./SettingItem";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import OptionsController from "./InputController";
import { GlobalContext } from "../../Context/GlobalContext";
import InputController from "./InputController";
import { SettingsContext } from "../../Context/SettingsContext";

interface SettingsControllerProps {
  options: string[];
  values: { [key: string]: any };
}

const SettingsController: React.FC<SettingsControllerProps> = ({
  options,
  values,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState("");
  const { toggleTvShown } = useContext(GlobalContext);
  const { device } = useContext(SettingsContext);

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
          {options.map((option) => {
            //filter out options that are not supported by the device type
            if (defaultSettings?.[option]?.includeTypes) {
              const includedTypes = defaultSettings?.[option]?.includeTypes;
              if (typeof includedTypes === "string") {
                if (device.type !== includedTypes) return;
              } else if (typeof includedTypes === "object") {
                if (!includedTypes.includes(device.type)) return;
              }
            }
            //if the element is a custom element then don't use a default setting.
            const settingOption = defaultSettings?.[option];
            if (settingOption?.type === "custom-item") {
              return <>{settingOption.element}</>;
            }
            return (
              <SettingItem
                key={`settings-controller-item-${option}`}
                value={getDisplayValue(values[option as keyof typeof values])}
                style={{ width: "calc(100% - 20px)" }}
                onClick={() => {
                  if (option === "tv_settings") {
                    toggleTvShown(true);
                  }
                  setIsEditing(true);
                  setEditing(option);
                }}
                title={option}
                icon={defaultSettings?.[option]?.icon}
              />
            );
          })}
        </div>
      </div>
      <div>
        <InputController
          options={defaultSettings}
          option={editing}
        ></InputController>
      </div>
    </HorizontalTransition>
  );
};

export default SettingsController;
