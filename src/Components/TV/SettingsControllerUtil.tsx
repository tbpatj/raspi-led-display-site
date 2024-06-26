import { SettingsControllerList } from "../Device/SettingsControllerUtil";
import FrameProcessing from "./FrameProcessing";
import TVBezel from "./TVBezel";
import TVDeadzone from "./TVDeadzone";

export const defaultTVSettings: SettingsControllerList = {
  aspect_ratio: {
    type: "select",
    options: [
      { text: "16:9", value: "16:9" },
      { text: "4:3", value: "4:3" },
      { text: "16:10", value: "16:10" },
      { text: "21:9", value: "21:9" },
      { text: "32:9", value: "32:9" },
    ],
    id: "aspect-ratio-select-menu",
    title: "Aspect Ratio",
  },
  frame_processing: {
    type: "custom-input",
    title: "Frame Processing",
    element: <FrameProcessing />,
  },
  bezel: {
    type: "custom-input",
    title: "Frame Processing",
    element: <TVBezel />,
  },
  dead_zone: {
    type: "custom-input",
    title: "Frame Processing",
    element: <TVDeadzone />,
  },
};
