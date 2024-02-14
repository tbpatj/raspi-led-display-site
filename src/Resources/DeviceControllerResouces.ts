import { Devices } from "./DeviceResources";
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
  devices: { [name: string]: Devices };
  presets: { [name: string]: DevicePresets };
}
