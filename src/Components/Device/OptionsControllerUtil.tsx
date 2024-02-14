import { SelectMenuOption } from "../Input/SelectMenu";
import TVSettings from "../Options/TVSettings";

// ----------------- Option Controller Type Declaration ----------------- //

export type ControllerOptions = {
  [key: string]:
    | CustomControllerOption
    | SelectControllerOption
    | InputControllerOption;
};

interface ControllerOption {
  type: "custom" | "select" | "text";
}

interface CustomControllerOption extends ControllerOption {
  type: "custom";
  element: React.ReactNode | React.ReactNode[];
}

export interface SelectControllerOption extends ControllerOption {
  type: "select";
  options: SelectMenuOption[];
  id: string;
  title?: string;
}

interface InputControllerOption extends ControllerOption {
  type: "text";
  id?: string;
  filter?: (value: string, prevVal?: string) => string;
  title?: string;
}

// ----------------- Option Controller Basic Options ----------------- //

export const BaseControllerOptions: ControllerOptions = {
  power: {
    type: "select",
    options: [
      { text: "On", value: "on" },
      { text: "Off", value: "off" },
    ],
    id: "power-select-menu",
    title: "Power",
  },
  type: {
    type: "select",
    options: [
      { text: "RGB Addressable Strip", value: "addressable" },
      { text: "RGB Non-Addressable Strip", value: "non-addressable" },
    ],
    id: "rgb-strip-type-select-menu",
    title: "RGB Strip Type",
  },
  //soon this should be custom to adjust for not just addressable strips
  pin_out: {
    type: "text",
    id: "rgb-strip-type-select-menu",
    title: "RGB Strip Type",
  },
  brightness: {
    type: "text",
    id: "brightness-input",
    title: "Brightness",
  },
  tv_settings: {
    type: "custom",
    element: <TVSettings />,
  },
  image_processing: {
    type: "custom",
    element: <div></div>,
  },
  idle_animation: {
    type: "custom",
    element: <div></div>,
  },
  preset: {
    type: "select",
    options: [{ text: "Default", value: "default" }],
    id: "options-controller-device-preset",
    title: "Presets",
  },
};
