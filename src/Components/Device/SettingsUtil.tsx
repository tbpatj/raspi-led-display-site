import PowerIcon from "../../SVGs/PowerIcon";
import RGBStripIcon from "../../SVGs/RGBStripIcon";
import ImageIcon from "../../SVGs/ImageIcon";
import AnimationIcon from "../../SVGs/AnimationIcon";
import PinoutIcon from "../../SVGs/PinoutIcon";
import BrightnessIcon from "../../SVGs/BrightnessIcon";

export const presetSettingItems: { [deviceType: string]: string[] } = {
  addressable: ["power", "image_processing", "idle_animation", "brightness"],
  "non-addressable": ["power", "type"],
};

// export const settingElements: {
//   [key: string]: {
//     element: React.ReactNode | React.ReactNode[];
//     icon: React.ReactNode | React.ReactNode[];
//   };
// } = {
//   power: {
//     element: <div></div>,
//     icon: <PowerIcon width="25" height="28" stroke="inherit" />,
//   },
//   type: {
//     element: <div></div>,
//     icon: (
//       <RGBStripIcon
//         stroke="inherit"
//         width="40"
//         height="8"
//         style={{
//           transformOrigin: "center",
//           transform: "rotate(-45deg)",
//         }}
//       />
//     ),
//   },
//   idle_animation: {
//     element: <div></div>,
//     icon: <AnimationIcon width="30" height="26" stroke="inherit" />,
//   },
//   pin_out: {
//     element: <div></div>,
//     icon: <PinoutIcon width="35" height="24" stroke="inherit" />,
//   },
//   brightness: {
//     element: <div></div>,
//     icon: <BrightnessIcon width="30" height="30" stroke="inherit" />,
//   },
// };
