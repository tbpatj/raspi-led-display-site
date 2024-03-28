import { useContext, useState } from "react";
import { SettingsControllerList } from "./SettingsControllerUtil";
import SettingItem from "./SettingItem";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import { GlobalContext } from "../../Context/GlobalContext";
import InputController from "./InputController";
import { SettingsContext } from "../../Context/SettingsContext";
import SettingDivider from "./SettingDivider";
import { getJsonValue } from "../../Resources/JsonChange";

interface SettingsControllerProps {
  options: string[];
  settings: SettingsControllerList;
  title?: string;
}

const SettingsController: React.FC<SettingsControllerProps> = ({
  options,
  title,
  settings,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState("");
  const [dividerHide, setDividerHide] = useState<{ [name: string]: boolean }>(
    {}
  );
  const { toggleTvShown, presets, modes } = useContext(GlobalContext);
  const { data } = useContext(SettingsContext);

  const getDisplayValue = (value: any) => {
    if (typeof value === "string") return value;
    else if (typeof value === "number") return value.toString();
    else return "";
  };

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
            if (settings?.[option]?.includeTypes) {
              const includedTypes = settings?.[option]?.includeTypes;
              if (typeof includedTypes === "string") {
                if (data?.type !== includedTypes) return;
              } else if (typeof includedTypes === "object") {
                if (!includedTypes.includes(data?.type)) return;
              }
            }
            if (settings?.[option]?.modeInfo) {
              //if the mode doesn't support the current setting then remove it.
              const modeInfo = settings?.[option].modeInfo;
              if (!modeInfo?.[data.settings.mode]) return;
            }
            //if the element is only meant to shown when the preset it a custom preset
            if (settings?.[option]?.whenCustom && data.preset !== "custom")
              return;
            const settingOption = settings?.[option];

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
              settings?.[option]?.overrideValue?.(data) ??
              getJsonValue(data, [...(settings?.[option]?.path ?? []), option]);

            return (
              <SettingItem
                key={`settings-controller-item-${option}`}
                value={getDisplayValue(value)}
                onClick={() => {
                  setIsEditing(true);
                  setEditing(option);
                }}
                title={option}
                icon={settings?.[option]?.icon}
              />
            );
          })}
        </div>
      </div>
      <div>
        <InputController options={settings} option={editing}></InputController>
      </div>
    </HorizontalTransition>
  );
};

export default SettingsController;
