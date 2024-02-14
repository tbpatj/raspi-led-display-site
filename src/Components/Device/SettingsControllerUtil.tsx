import { SelectMenuOption } from "../Input/SelectMenu";
import TVSettings from "../Options/TVSettings";

import PowerIcon from "../../SVGs/PowerIcon";
import RGBStripIcon from "../../SVGs/RGBStripIcon";
import ImageIcon from "../../SVGs/ImageIcon";
import AnimationIcon from "../../SVGs/AnimationIcon";
import PinoutIcon from "../../SVGs/PinoutIcon";
import BrightnessIcon from "../../SVGs/BrightnessIcon";
import { DeviceTypes } from "../../Resources/DeviceResources";

// ----------------- Option Controller Type Declaration ----------------- //

export type SettingsControllerList = {
  [key: string]:
    | CustomInputSettingItem
    | SelectSettingItem
    | InputSettingItem
    | CustomSettingItem;
};

interface SettingListItem {
  type: "custom-input" | "select" | "text" | "custom-item";
  icon?: React.ReactNode | React.ReactNode[] | string;
  dataType: "device" | "preset";
  includeTypes?: DeviceTypes | DeviceTypes[];
}

interface CustomSettingItem extends SettingListItem {
  type: "custom-item";
  element: React.ReactNode | React.ReactNode[];
}

interface CustomInputSettingItem extends SettingListItem {
  type: "custom-input";
  element: React.ReactNode | React.ReactNode[];
}

export interface SelectSettingItem extends SettingListItem {
  type: "select";
  options: SelectMenuOption[];
  id: string;
  title?: string;
}

interface InputSettingItem extends SettingListItem {
  type: "text";
  id?: string;
  filter?: (value: string, prevVal?: string) => string;
  title?: string;
}

// ----------------- Option Controller Basic Options ----------------- //

export const defaultSettings: SettingsControllerList = {
  power: {
    type: "select",
    options: [
      { text: "On", value: "on" },
      { text: "Off", value: "off" },
    ],
    id: "power-select-menu",
    title: "Power",
    icon: <PowerIcon width="25" height="28" stroke="inherit" />,
    dataType: "preset",
  },
  type: {
    type: "select",
    options: [
      { text: "RGB Addressable Strip", value: "addressable" },
      { text: "RGB Non-Addressable Strip", value: "non-addressable" },
    ],
    id: "rgb-strip-type-select-menu",
    title: "RGB Strip Type",
    icon: (
      <RGBStripIcon
        stroke="inherit"
        width="40"
        height="8"
        style={{
          transformOrigin: "center",
          transform: "rotate(-45deg)",
        }}
      />
    ),
    dataType: "device",
  },
  //soon this should be custom to adjust for not just addressable strips
  pin_out: {
    type: "text",
    id: "rgb-strip-type-select-menu",
    title: "RGB Strip Type",
    dataType: "device",
    icon: <PinoutIcon width="35" height="24" stroke="inherit" />,
  },
  brightness: {
    type: "text",
    id: "brightness-input",
    title: "Brightness",
    dataType: "preset",
    icon: <BrightnessIcon width="30" height="30" stroke="inherit" />,
  },
  tv_settings: {
    type: "custom-input",
    dataType: "device",
    element: <TVSettings />,
    includeTypes: "addressable",
  },
  image_processing: {
    type: "custom-input",
    element: <div></div>,
    dataType: "preset",
    icon: <ImageIcon width="30" height="24" stroke="inherit" />,
  },
  idle_animation: {
    type: "custom-input",
    element: <div></div>,
    dataType: "preset",
    icon: <AnimationIcon width="30" height="26" stroke="inherit" />,
  },
  preset: {
    type: "select",
    dataType: "device",
    options: [{ text: "Default", value: "default" }],
    id: "options-controller-device-preset",
    title: "Presets",
  },
  name: {
    type: "custom-item",
    dataType: "device",
    element: <div>input</div>,
  },
  device_confirm: {
    type: "custom-item",
    dataType: "device",
    element: <div>input</div>,
  },
};
