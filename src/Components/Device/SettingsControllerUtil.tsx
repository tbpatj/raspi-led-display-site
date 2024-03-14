import { SelectMenuOption } from "../Input/SelectMenu";
import TVSettings from "../Options/TVSettings";

import PowerIcon from "../../SVGs/PowerIcon";
import RGBStripIcon from "../../SVGs/RGBStripIcon";
import ImageIcon from "../../SVGs/ImageIcon";
import AnimationIcon from "../../SVGs/AnimationIcon";
import PinoutIcon from "../../SVGs/PinoutIcon";
import BrightnessIcon from "../../SVGs/BrightnessIcon";
import { DeviceTypes } from "../../Resources/DeviceResources";
import DeviceName from "../Settings/DeviceName";
import ConfirmNewDevice from "../Settings/ConfirmNewDevice";
import SavePreset from "../Settings/SavePreset";
import Mappings from "../Options/Mappings";

// ----------------- Option Controller Type Declaration ----------------- //

export type SettingsControllerList = {
  [key: string]:
    | CustomInputSettingItem
    | SelectSettingItem
    | InputSettingItem
    | CustomSettingItem
    | DividerSettingItem;
};

interface SettingListItem {
  type: "custom-input" | "select" | "text" | "custom-item" | "divider";
  icon?: React.ReactNode | React.ReactNode[] | string;
  dataType: "device" | "preset";
  modeInfo?: ModeInfo;
  includeTypes?: DeviceTypes | DeviceTypes[];
  whenCustom?: boolean;
}

interface CustomSettingItem extends SettingListItem {
  type: "custom-item";
  element: React.ReactNode | React.ReactNode[];
}

interface CustomInputSettingItem extends SettingListItem {
  type: "custom-input";
  element: React.ReactNode | React.ReactNode[];
}

interface DividerSettingItem extends SettingListItem {
  type: "divider";
  title: string;
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
/**
 *
 * [modeName: string]: info
 * @param modeName - The name of the mode that enables this option to be displayed, if not provided, the option will be displayed for all modes
 * @param info - The information that will be displayed if the user hovers for help changes depending on the mode. If empty string, then it will not display
 */
interface ModeInfo {
  [modeName: string]: string;
}

// ----------------- Option Controller Basic Options ----------------- //

export const defaultSettings: SettingsControllerList = {
  save_preset: {
    type: "custom-item",
    dataType: "preset",
    whenCustom: true,
    element: <SavePreset />,
  },
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
    modeInfo: {
      tv: "Specify which light index corresponds with which side of the TV",
    },
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
    element: <DeviceName />,
  },
  led_count: {
    type: "text",
    dataType: "device",
    title: "Led Count",
  },
  device_confirm: {
    type: "custom-item",
    dataType: "device",
    element: <ConfirmNewDevice />,
  },
  mappings: {
    type: "custom-input",
    dataType: "preset",
    element: <Mappings />,
  },
  mode: {
    type: "select",
    dataType: "preset",
    id: "mode-select",
    options: [
      { text: "Breathe", value: "breathe" },
      { text: "Fade", value: "fade" },
      { text: "TV", value: "tv" },
      { text: "Test", value: "test", type: "addressable" },
    ],
  },
  device_divider: {
    type: "divider",
    title: "Device Settings",
    dataType: "device",
  },
  preset_divider: {
    type: "divider",
    title: "Presets",
    dataType: "device",
  },
  properties_divider: {
    type: "divider",
    title: "Properties",
    dataType: "device",
  },
};
