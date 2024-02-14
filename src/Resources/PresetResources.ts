import { DeviceTypes } from "./DeviceResources";

export type DevicePresets =
  | RGBNonAddressableTVPreset
  | RGBAddressableTVPreset
  | DevicePreset;

export interface DevicePreset {
  power: "on" | "off";
  type: DeviceTypes;
}

// ================================================ //
// ------------------ RGB STRIPS ------------------ //
// ================================================ //

// ----------------- TV ----------------- //

export interface RGBNonAddressableTVPreset extends DevicePreset {
  type: "non-addressable-tv";
  image_processing: string;
}

export interface RGBAddressableTVPreset extends DevicePreset {
  type: "addressable-tv";
  image_processing: string;
}
