import { SelectMenuOption } from "../Input/SelectMenu";

import PowerIcon from "../../SVGs/PowerIcon";
import RGBStripIcon from "../../SVGs/RGBStripIcon";
import ImageIcon from "../../SVGs/ImageIcon";
import AnimationIcon from "../../SVGs/AnimationIcon";
import PinoutIcon from "../../SVGs/PinoutIcon";
import BrightnessIcon from "../../SVGs/BrightnessIcon";
import {
  Device,
  DeviceTypes,
  RGBAddressableDevice,
  RGBNonAddressableDevice,
} from "../../Resources/DeviceResources";
import DeviceName from "../Settings/DeviceName";
import ConfirmNewDevice from "../Settings/ConfirmNewDevice";
import SavePreset from "../Settings/SavePreset";
import Mappings from "../Options/Mappings";
import MappingIcon from "../../SVGs/MappingIcon";
import PresetIcon from "../../SVGs/PresetIcon";
import LedCountIcon from "../../SVGs/LedCountIcon";
import TransitionIcon from "../../SVGs/TransitionIcon";
import PinOut from "../Options/Pinout";

// ----------------- Option Controller Type Declaration ----------------- //

export type SettingsControllerList = {
  [key: string]: SettingsControllerItem;
};

export type SettingsControllerItem =
  | CustomInputSettingItem
  | SelectSettingItem
  | InputSettingItem
  | CustomSettingItem
  | DividerSettingItem
  | NumberSettingItem;

interface SettingListItem {
  type:
    | "custom-input"
    | "select"
    | "text"
    | "custom-item"
    | "divider"
    | "number";
  title?: string;
  icon?: React.ReactNode | React.ReactNode[] | string;
  dataType: "device" | "preset";
  modeInfo?: ModeInfo;
  includeTypes?: DeviceTypes | DeviceTypes[];
  whenCustom?: boolean;
  overrideValue?: (device: Device) => string;
  overrideChanges?: (nDevice: Device) => Device;
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

interface NumberSettingItem extends SettingListItem {
  type: "number";
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
    //make sure to override certain values when the type of a device changes.
    overrideChanges: (nDevice: Device) => {
      if (nDevice.type === "non-addressable") {
        (nDevice as RGBNonAddressableDevice).pin_out = {
          r_pin: 0,
          g_pin: 0,
          b_pin: 0,
        };
        nDevice = nDevice as RGBNonAddressableDevice;
      } else if (nDevice.type === "addressable") {
        (nDevice as RGBAddressableDevice).led_count = 0;
        (nDevice as RGBAddressableDevice).pin_out = 0;
      }
      return nDevice;
    },
    dataType: "device",
  },
  //soon this should be custom to adjust for not just addressable strips
  pin_out: {
    type: "custom-input",
    dataType: "preset",
    element: <PinOut />,
    icon: <PinoutIcon width="35" height="24" stroke="inherit" />,
    overrideValue: (device: Device) => {
      if (device.type === "non-addressable") {
        const pins = (device as RGBNonAddressableDevice).pin_out;
        return `r:${pins.r_pin} g:${pins.g_pin} b:${pins.b_pin}`;
      } else if (device.type === "addressable") {
        return (device as RGBAddressableDevice).pin_out.toString();
      }
      return "";
    },
  },
  brightness: {
    type: "text",
    id: "brightness-input",
    title: "Brightness",
    dataType: "preset",
    icon: <BrightnessIcon width="30" height="30" stroke="inherit" />,
  },
  animation_speed: {
    type: "number",
    id: "animation-speed-input",
    title: "Animation Speed",
    icon: <AnimationIcon width="30" height="26" stroke="inherit" />,
    dataType: "preset",
  },
  transition_speed: {
    type: "number",
    id: "transition-speed-input",
    title: "Transition Speed",
    dataType: "device",
    icon: <TransitionIcon width="30" height="26" stroke="inherit" />,
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
    icon: <PresetIcon width="30" height="30" stroke="inherit" />,
  },
  name: {
    type: "custom-item",
    dataType: "device",
    element: <DeviceName />,
  },
  led_count: {
    type: "number",
    dataType: "device",
    includeTypes: "addressable",
    title: "Led Count",
    icon: <LedCountIcon width="30" height="30" stroke="inherit" />,
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
    icon: <MappingIcon width="30" height="30" stroke="inherit" />,
  },
  mode: {
    type: "select",
    dataType: "preset",
    id: "mode-select",
    title: "Mode",
    icon: <ImageIcon width="30" height="24" stroke="inherit" />,
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
