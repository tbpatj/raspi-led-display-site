import { ServerResponse } from "./ServerResponseResources";

export interface TVSettings {
  padding: { x: number; y: number };
  iterations: { x: number; y: number };
  step: { x: number; y: number };
  aspect_ratio: string;
  dead_zone: number;
  process1Pxl: boolean;
}

export const defaultTVSettings: TVSettings = {
  padding: { x: 0, y: 0 },
  iterations: { x: 0, y: 0 },
  step: { x: 0, y: 0 },
  aspect_ratio: "16:9",
  dead_zone: 0,
  process1Pxl: false,
};

// ------------- Use TV Settings Hook -------------

export interface GetTVSettingsResponse extends ServerResponse {
  data: TVSettings;
}

export type GetTVSettingsFunc = () => Promise<GetTVSettingsResponse>;

export type SetTVSettingsFunc = (
  settings: TVSettings
) => Promise<ServerResponse>;

// ------------- TV Mapping Hook -------------
export interface GetTVMappingsResponse extends ServerResponse {
  data: TVMappings;
}
export interface TVMappings {
  topS: number;
  topE: number;
  bottomS: number;
  bottomE: number;
  leftS: number;
  leftE: number;
  rightS: number;
  rightE: number;
}

export const defaultTVMappings = {
  topS: 0,
  topE: 0,
  bottomS: 0,
  bottomE: 0,
  leftS: 0,
  leftE: 0,
  rightS: 0,
  rightE: 0,
};
