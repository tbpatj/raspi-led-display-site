import { RGBAddressableTVSettings } from "./DeviceUtilResources";
import {
  DevicePresets,
  RGBAddressablePreset,
  RGBNonAddressablePreset,
} from "./PresetResources";

export type Devices = RGBAddressableDevice | RGBNonAddressableDevice | Device;

export type DeviceTypes = "non-addressable" | "addressable";

export interface Device {
  name: string;
  preset: string;
  type: DeviceTypes;
  settings: DevicePresets;
}
// ================================================ //
// ------------------ RGB STRIPS ------------------ //
// ================================================ //

export interface RGBAddressableDevice extends Device {
  type: "addressable";
  pin_out: number;
  tv_settings?: RGBAddressableTVSettings;
  settings: RGBAddressablePreset;
}

export interface RGBNonAddressableDevice extends Device {
  type: "non-addressable";
  pin_out: { r: number; g: number; b: number };
  settings: RGBNonAddressablePreset;
}
