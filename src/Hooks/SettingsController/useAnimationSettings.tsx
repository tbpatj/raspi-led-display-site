import { cloneDeep } from "lodash";
import { useContext, useMemo } from "react";
import {
  SelectSettingItem,
  SettingsControllerList,
} from "../../Components/Device/SettingsControllerUtil";
import { GlobalContext } from "../../Context/GlobalContext";
import { SelectMenuOption } from "../../Components/Input/SelectMenu";
import { defaultAnimationsSettings } from "../../Components/Animations/SettingsControllerUtil";

interface UseAnimationSettings {
  settings: SettingsControllerList;
}

const useAnimationSettings: () => UseAnimationSettings = () => {
  const { modes } = useContext(GlobalContext);

  const settings = useMemo(() => {
    const settings = cloneDeep(defaultAnimationsSettings);

    //set up the mode settings
    const modeSetting = cloneDeep(settings.delete as SelectSettingItem);
    modeSetting.options = modes.map((mode) => {
      return { text: mode, value: mode } as SelectMenuOption;
    });
    settings.delete = modeSetting;
    return settings;
  }, [modes]);

  return { settings };
};

export default useAnimationSettings;
