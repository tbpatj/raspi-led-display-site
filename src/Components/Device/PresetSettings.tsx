import { useContext, useMemo, useState } from "react";
import OptionsController from "./OptionsController";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import {
  BaseControllerOptions,
  SelectControllerOption,
} from "./OptionsControllerUtil";
import { DeviceContext } from "../../Context/DeviceContext";
import { GlobalContext } from "../../Context/GlobalContext";
import SettingItem from "./SettingItem";
import { settingElements } from "./SettingsUtil";

interface PresetSettingsProps {}

const PresetSettings: React.FC<PresetSettingsProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState("");
  const { device } = useContext(DeviceContext);
  const { presets } = useContext(GlobalContext);
  const presetName = useMemo(() => {
    return device.preset;
  }, [device]);
  const preset = useMemo(() => {
    return presets.find((preset) => {
      return preset.name === presetName && preset.type === device.type;
    });
  }, [presetName]);

  const controllerOptions = useMemo(() => {
    const newOptions = { ...BaseControllerOptions };
    delete newOptions.type;
    (newOptions.preset as SelectControllerOption).options = presets
      .filter((preset) => {
        return preset.type === device.type;
      })
      .map((preset) => {
        return { text: preset.name, value: preset.name };
      });
    return newOptions;
  }, [presets]);

  const getDisplayValue = (value: any) => {
    if (typeof value === "string") return value;
    else if (typeof value === "number") return value.toString();
    else return "";
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <HorizontalTransition
        onBack={() => setIsEditing(false)}
        id="device-settings-transition"
        selected={isEditing ? 1 : 0}
      >
        {/* <div className="position-item-container"> */}
        <div className="device-settings-container">
          <h1 className="device-settings-title">Title of Device</h1>
          {
            <SettingItem
              value={presetName}
              onClick={() => {
                setIsEditing(true);
                setEditing("preset");
              }}
              title="Presets"
              element={{ icon: <></>, element: <></> }}
            ></SettingItem>
          }
          {Object.keys(settingElements).map((option, i) => {
            return (
              <SettingItem
                value={getDisplayValue(
                  preset?.[option as keyof typeof preset] ?? ""
                )}
                title={option}
                element={settingElements[option]}
                onClick={() => {
                  setIsEditing(true);
                  setEditing(option);
                }}
                key={`device-option-${i}-${option}`}
              />
            );
          })}
        </div>
        <OptionsController
          options={controllerOptions}
          option={editing}
        ></OptionsController>
      </HorizontalTransition>
    </div>
  );
};

export default PresetSettings;
