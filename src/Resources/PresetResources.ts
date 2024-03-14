import { DeviceTypes } from "./DeviceResources";

export type DevicePresets =
  | RGBAddressablePreset
  | RGBNonAddressablePreset
  | DevicePreset;

export const modes = ["breathe", "fade", "custom", "tv"] as const;

export interface DevicePreset {
  device_name: string;
  device_type: DeviceTypes;
  name: string;
  power: "on" | "off";
  mode: (typeof modes)[number];
  mapping: Mapping[];
}

export interface Mapping {
  ledSIndx: number;
  ledEIndx: number;
  mapSIndx: number;
  mapEIndx: number;
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
  {
    name: "default",
    power: "off",
    device_name: "",
    device_type: "addressable",
    mode: "breathe",
    mapping: [{ ledSIndx: 0, ledEIndx: 0, mapSIndx: 0, mapEIndx: 0 }],
  },
  {
    name: "default",
    power: "off",
    device_name: "",
    device_type: "non-addressable",
    mode: "breathe",
    mapping: [{ ledSIndx: 0, ledEIndx: 0, mapSIndx: 0, mapEIndx: 0 }],
  },
];
