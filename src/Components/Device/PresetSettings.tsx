import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import SettingsController from "./SettingsController";

interface PresetSettingsProps {}

const PresetSettings: React.FC<PresetSettingsProps> = () => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [editing, setEditing] = useState("");
  // const { device } = useContext(DeviceContext);
  const { presets } = useContext(GlobalContext);
  // const presetName = useMemo(() => {
  //   return device.preset;
  // }, [device]);
  // const preset = useMemo(() => {
  //   return presets.find((preset) => {
  //     return preset.name === presetName && preset.type === device.type;
  //   });
  // }, [presetName]);

  // const controllerOptions = useMemo(() => {
  //   const newOptions = { ...BaseControllerOptions };
  //   delete newOptions.type;
  //   (newOptions.preset as SelectControllerOption).options = presets
  //     .filter((preset) => {
  //       return preset.type === device.type;
  //     })
  //     .map((preset) => {
  //       return { text: preset.name, value: preset.name };
  //     });
  //   return newOptions;
  // }, [presets]);

  // const getDisplayValue = (value: any) => {
  //   if (typeof value === "string") return value;
  //   else if (typeof value === "number") return value.toString();
  //   else return "";
  // };

  // console.log(
  //   "preset",
  //   preset,
  //   presetSettingItems,
  //   presetSettingItems[preset?.type ?? "addressable"]
  // );

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <SettingsController
        options={[
          "preset_divider",
          "save_preset",
          "preset",
          "properties_divider",
          "power",
          "mode",
          "device_divider",
          "mappings",
          "pin_out",
        ]}
        values={presets}
      />
      {/* <HorizontalTransition
        onBack={() => setIsEditing(false)}
        id="device-settings-transition"
        selected={isEditing ? 1 : 0}
      >
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
          {presetSettingItems[preset?.type ?? "addressable"]?.map(
            (option, i) => {
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
            }
          )}
        </div>
        <OptionsController
          options={controllerOptions}
          option={editing}
        ></OptionsController>
      </HorizontalTransition> */}
    </div>
  );
};

export default PresetSettings;
