import { useState } from "react";
import VerticalTransition from "../TransitionContainers/VerticalTransition";
import PowerIcon from "../../SVGs/PowerIcon";
import RGBStripIcon from "../../SVGs/RGBStripIcon";
import ImageIcon from "../../SVGs/ImageIcon";
import AnimationIcon from "../../SVGs/AnimationIcon";
import PinoutIcon from "../../SVGs/PinoutIcon";
import BrightnessIcon from "../../SVGs/BrightnessIcon";
import ArrowThinIcon from "../../SVGs/ArrowThinIcon";
import OptionController from "./OptionsController";
import OptionsController from "./OptionsController";
import HorizontalTransition from "../TransitionContainers/HorizonalTransition";
import DeviceSetting from "./DeviceSetting";

interface DeviceSettingsProps {}

export const deviceOptions: {
  [key: string]: {
    element: React.ReactNode | React.ReactNode[];
    icon: React.ReactNode | React.ReactNode[];
  };
} = {
  power: {
    element: <div></div>,
    icon: <PowerIcon width="25" height="28" stroke="inherit" />,
  },
  type: {
    element: <div></div>,
    icon: (
      <RGBStripIcon
        stroke="inherit"
        width="40"
        height="8"
        style={{
          transformOrigin: "center",
          transform: "rotate(-45deg)",
        }}
      />
    ),
  },
  configure: { element: <div></div>, icon: <span></span> },
  image_processing: {
    element: <div></div>,
    icon: <ImageIcon width="30" height="24" stroke="inherit" />,
  },
  idle_animation: {
    element: <div></div>,
    icon: <AnimationIcon width="30" height="26" stroke="inherit" />,
  },
  pin_out: {
    element: <div></div>,
    icon: <PinoutIcon width="35" height="24" stroke="inherit" />,
  },
  brightness: {
    element: <div></div>,
    icon: <BrightnessIcon width="30" height="30" stroke="inherit" />,
  },
};

const DeviceSettings: React.FC<DeviceSettingsProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState("");
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <HorizontalTransition
        onBack={() => setIsEditing(false)}
        id="device-settings-transition"
        selected={isEditing ? 1 : 0}
      >
        {/* <div className="position-item-container"> */}
        <div className="device-settings-container">
          <h1 className="device-settings-title">Title of Device</h1>
          {Object.keys(deviceOptions).map((option, i) => {
            return (
              <DeviceSetting
                value="on"
                title={option}
                elements={deviceOptions[option]}
                onClick={() => {
                  setIsEditing(true);
                  setEditing(option);
                }}
                key={`device-option-${i}-${option}`}
              />
            );
          })}
        </div>
        <OptionsController option={editing}></OptionsController>
      </HorizontalTransition>
    </div>
  );
};

export default DeviceSettings;
