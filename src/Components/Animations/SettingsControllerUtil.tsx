import AnimationIcon from "../../SVGs/AnimationIcon";
import PowerIcon from "../../SVGs/PowerIcon";
import { SettingsControllerList } from "../Device/SettingsControllerUtil";
import UploadSetting from "../Settings/UploadSetting";

export const defaultAnimationsSettings: SettingsControllerList = {
  upload: {
    type: "custom-input",
    path: ["settings"],
    element: <UploadSetting />,
    icon: <AnimationIcon width="30" height="30" stroke="inherit" />,
  },
  delete: {
    type: "select",
    options: [
      { text: "On", value: "on" },
      { text: "Off", value: "off" },
    ],
    id: "delete-animations-selection",
    title: "Delete Animation",
    icon: <PowerIcon width="25" height="28" stroke="inherit" />,
  },
};
