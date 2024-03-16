import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import SettingsController from "./SettingsController";

interface PresetSettingsProps {}

const PresetSettings: React.FC<PresetSettingsProps> = () => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [editing, setEditing] = useState("");
  // const { device } = useContext(DeviceContext);
  const { presets } = useContext(GlobalContext);

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
          "animation_speed",
          "device_divider",
          "transition_speed",
          "mappings",
          "pin_out",
          "led_count",
        ]}
        values={presets}
      />
    </div>
  );
};

export default PresetSettings;
