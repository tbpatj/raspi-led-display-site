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
