import { DeviceTypes } from "./DeviceResources";

export type DevicePresets =
  | RGBAddressablePreset
  | RGBNonAddressablePreset
  | DevicePreset;

export interface DevicePreset {
  name: string;
  power: "on" | "off";
  type: DeviceTypes;
}

// ================================================ //
// ------------------ RGB STRIPS ------------------ //
// ================================================ //

// ----------------- TV ----------------- //

export interface RGBNonAddressablePreset extends DevicePreset {
  type: "non-addressable";
  mode: "tv" | "custom" | "fade";
  image_processing: string;
}

export interface RGBAddressablePreset extends DevicePreset {
  type: "addressable";
  image_processing: string;
}

export const defaultPresets: DevicePresets[] = [
  { name: "default", power: "off", type: "addressable" },
  { name: "default", power: "off", type: "non-addressable" },
];
