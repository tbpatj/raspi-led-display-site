export interface RGBStripController {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: string;
  brightness: number;
  power: boolean;
  mode: string;
  devices: { [name: string]: RGBStripDevice };
}

export interface RGBStripDevice {
  name: string;
  preset: string;
  presets: {
    [name: string]: RGBNonAddressableStripPreset | RGBAddressableStripPreset;
  };
}

export interface RGBStripPreset {
  power: "on" | "off";
  type: "addressable" | "non-addressable";
  image_processing: string;
  idle_animation: string;
  brightness: number;
}

export interface RGBNonAddressableStripPreset extends RGBStripPreset {
  type: "non-addressable";
  pin_out: { r: number; g: number; b: number };
}

export interface RGBAddressableStripPreset extends RGBStripPreset {
  type: "addressable";
  configure: {
    configured: boolean;
    lefts: number;
    lefte: number;
    tops: number;
    tope: number;
    rights: number;
    righte: number;
    bottoms: number;
    bottome: number;
  };
  pin_out: number;
}
