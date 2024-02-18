import { useContext, useEffect, useState } from "react";
import { defaultSettings } from "./SettingsControllerUtil";
import SettingItem from "./SettingItem";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import { GlobalContext } from "../../Context/GlobalContext";
import InputController from "./InputController";
import { SettingsContext } from "../../Context/SettingsContext";

interface SettingsControllerProps {
  options: string[];
  values: { [key: string]: any };
  title?: string;
}

const SettingsController: React.FC<SettingsControllerProps> = ({
  options,
  values,
  title,
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
          <h1>{title ? title : ""}</h1>
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
            if (defaultSettings?.[option]?.modeInfo) {
              //if the mode doesn't support the current setting then remove it.
              const modeInfo = defaultSettings?.[option].modeInfo;
              if (!modeInfo?.[device.settings.mode]) return;
            }
            //if the element is a custom element then don't use a default setting.
            const settingOption = defaultSettings?.[option];
            if (settingOption?.type === "custom-item") {
              return <>{settingOption.element}</>;
            }
            //get the value if it's a preset setting or a device setting
            const value =
              defaultSettings?.[option]?.dataType === "device"
                ? device?.[option as keyof typeof device]
                : device.settings?.[option as keyof typeof device.settings];

            return (
              <SettingItem
                key={`settings-controller-item-${option}`}
                value={getDisplayValue(value)}
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
