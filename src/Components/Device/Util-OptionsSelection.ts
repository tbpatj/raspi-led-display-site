import { SelectMenuOption } from "../Input/SelectMenu";

// ----------------- Power Options ----------------- //

export const powerOptions: SelectMenuOption[] = [
  { text: "On", value: "on" },
  { text: "Off", value: "off" },
];

export const powerOptionSelectMenu = {
  title: "Power",
  options: powerOptions,
  id: "power-select-menu",
};

// ----------------- Type Options ----------------- //

export const typeOptions: SelectMenuOption[] = [
  { text: "RGB Addressable Strip", value: "addressable" },
  { text: "RGB Non-Addressable Strip", value: "non-addressable" },
];

export const typeOptionSelectMenu = {
  title: "RGB Strip Type",
  options: typeOptions,
  id: "rgb-strip-type-select-menu",
};
