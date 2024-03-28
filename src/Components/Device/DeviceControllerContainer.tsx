import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import SettingsController from "./SettingsController";
import useDeviceSettings from "../../Hooks/SettingsController/useDeviceSettings";

interface DeviceControllerContainerProps {}

const DeviceControllerContainer: React.FC<
  DeviceControllerContainerProps
> = () => {
  const { presets } = useContext(GlobalContext);
  const { settings } = useDeviceSettings();

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <SettingsController
        settings={settings}
        options={[
          "preset_divider",
          "save_preset",
          "preset",
          "properties_divider",
          "power",
          "mode",
          "animation_speed",
          "device_divider",
          "transition_speed",
          "mappings",
          "pin_out",
          "led_count",
          "brightness",
          "delete",
        ]}
        values={presets}
      />
    </div>
  );
};

export default DeviceControllerContainer;
