import { DeviceTypes, Devices } from "./DeviceResources";
import { DevicePresets } from "./PresetResources";

export interface DeviceController {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: string;
  brightness: number;
  power: boolean;
  mode: string;
  devices: Devices[];
  presets: { [device: string]: { [preset: string]: DevicePresets } };
  // presets: { [name: string]: DevicePresets };
}
