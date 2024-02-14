import { RGBAddressableTVSettings } from "./DeviceUtilResrouces";

export type Devices =
  | RGBAddressableTVDevice
  | RGBNonAddressableTVDevice
  | RGBAddressableDevice
  | RGBNonAddressableDevice
  | Device;

export type DeviceTypes =
  | "addressable-tv"
  | "non-addressable-tv"
  | "non-addressable"
  | "addressable";

export interface Device {
  name: string;
  preset: string;
  type: DeviceTypes;
}
// ================================================ //
// ------------------ RGB STRIPS ------------------ //
// ================================================ //

// ----------------- TV ----------------- //

export interface RGBAddressableTVDevice extends Device {
  type: "addressable-tv";
  pin_out: number;
  tv_settings: RGBAddressableTVSettings;
}

export interface RGBNonAddressableTVDevice extends Device {
  type: "non-addressable-tv";
  pin_out: { r: number; g: number; b: number };
}

// ----------------- Regular Strips ----------------- //
export interface RGBAddressableDevice extends Device {
  type: "addressable";
  pin_out: number;
}

export interface RGBNonAddressableDevice extends Device {
  type: "non-addressable";
  pin_out: { r: number; g: number; b: number };
}
