import { DeviceTypes } from "./DeviceResources";

export type DevicePresets =
  | RGBAddressablePreset
  | RGBNonAddressablePreset
  | DevicePreset;

export const modes = ["breathe", "fade", "custom", "tv"] as const;

export interface DevicePreset {
  name: string;
  power: "on" | "off";
  type: DeviceTypes;
  mode: (typeof modes)[number];
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
  mode: "tv" | "custom" | "breathe";
  image_processing: string;
  blur?: number;
}

export const defaultPresets: DevicePresets[] = [
  { name: "default", power: "off", type: "addressable", mode: "breathe" },
  { name: "default", power: "off", type: "non-addressable", mode: "breathe" },
];
