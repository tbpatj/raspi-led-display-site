import { cloneDeep } from "lodash";
import { useContext, useMemo } from "react";
import {
  SelectSettingItem,
  SettingsControllerList,
  defaultSettings,
} from "../../Components/Device/SettingsControllerUtil";
import { GlobalContext } from "../../Context/GlobalContext";
import { SettingsContext } from "../../Context/SettingsContext";
import { SelectMenuOption } from "../../Components/Input/SelectMenu";

interface UseDeviceSettings {
  settings: SettingsControllerList;
}

const useDeviceSettings: () => UseDeviceSettings = () => {
  const { presets, modes } = useContext(GlobalContext);
  const { data } = useContext(SettingsContext);

  const settings = useMemo(() => {
    const settings = cloneDeep(defaultSettings);
    //set up the preset settings
    const preset = cloneDeep(settings.preset as SelectSettingItem);
    if (preset as SelectSettingItem)
      preset.options = presets
        .filter(
          (preset) =>
            preset.device_type === data.type && preset.device_name === data.name
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
  }, [data, presets, modes]);

  return { settings };
};

export default useDeviceSettings;
