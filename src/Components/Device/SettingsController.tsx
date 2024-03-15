import { useContext, useEffect, useMemo, useState } from "react";
import { SelectSettingItem, defaultSettings } from "./SettingsControllerUtil";
import SettingItem from "./SettingItem";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import { GlobalContext } from "../../Context/GlobalContext";
import InputController from "./InputController";
import { SettingsContext } from "../../Context/SettingsContext";
import { cloneDeep } from "lodash";
import { SelectMenuOption } from "../Input/SelectMenu";
import SettingDivider from "./SettingDivider";

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
  const [dividerHide, setDividerHide] = useState<{ [name: string]: boolean }>(
    {}
  );
  const { toggleTvShown, presets, modes } = useContext(GlobalContext);
  const { device } = useContext(SettingsContext);

  const getDisplayValue = (value: any) => {
    if (typeof value === "string") return value;
    else if (typeof value === "number") return value.toString();
    else return "";
  };

  const calcSettings = useMemo(() => {
    const settings = cloneDeep(defaultSettings);
    //set up the preset settings
    const preset = cloneDeep(settings.preset as SelectSettingItem);
    if (preset as SelectSettingItem)
      preset.options = presets
        .filter(
          (preset) =>
            preset.device_type === device.type &&
            preset.device_name === device.name
        )
        .map((preset) => {
          return {
            value: preset.name,
            text: preset.name,
          } as SelectMenuOption;
        });
    console.log(preset, presets);
    settings.preset = preset;

    //set up the mode settings
    const modeSetting = cloneDeep(settings.mode as SelectSettingItem);
    modeSetting.options = modes.map((mode) => {
      return { text: mode, value: mode } as SelectMenuOption;
    });
    settings.mode = modeSetting;
    return settings;
  }, [device, presets, modes]);

  let hideFromDivide = false;

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
            if (calcSettings?.[option]?.includeTypes) {
              const includedTypes = calcSettings?.[option]?.includeTypes;
              if (typeof includedTypes === "string") {
                if (device.type !== includedTypes) return;
              } else if (typeof includedTypes === "object") {
                if (!includedTypes.includes(device.type)) return;
              }
            }
            if (calcSettings?.[option]?.modeInfo) {
              //if the mode doesn't support the current setting then remove it.
              const modeInfo = calcSettings?.[option].modeInfo;
              if (!modeInfo?.[device.settings.mode]) return;
            }
            //if the element is only meant to shown when the preset it a custom preset
            if (
              calcSettings?.[option]?.whenCustom &&
              device.preset !== "custom"
            )
              return;
            const settingOption = calcSettings?.[option];

            if (settingOption?.type === "divider") {
              if (dividerHide?.[option]) hideFromDivide = true;
              else hideFromDivide = false;
              return (
                <SettingDivider
                  onClick={() => {
                    setDividerHide((prev) => {
                      return { ...prev, [option]: !prev[option] };
                    });
                  }}
                  title={settingOption.title}
                />
              );
            }

            if (hideFromDivide) {
              return null;
            }

            //if the element is a custom element then don't use a default setting.
            if (settingOption?.type === "custom-item") {
              return <>{settingOption.element}</>;
            }

            //get the value if it's a preset setting or a device setting
            const value =
              calcSettings?.[option]?.dataType === "device"
                ? device?.[option as keyof typeof device]
                : device.settings?.[option as keyof typeof device.settings];

            return (
              <SettingItem
                key={`settings-controller-item-${option}`}
                value={getDisplayValue(value)}
                style={{ width: "calc(100% - 20px)" }}
                onClick={() => {
                  setIsEditing(true);
                  setEditing(option);
                }}
                title={option}
                icon={calcSettings?.[option]?.icon}
              />
            );
          })}
        </div>
      </div>
      <div>
        <InputController
          options={calcSettings}
          option={editing}
        ></InputController>
      </div>
    </HorizontalTransition>
  );
};

export default SettingsController;
