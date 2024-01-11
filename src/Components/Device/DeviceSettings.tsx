import { useState } from "react";
import VerticalTransition from "../TransitionContainers/VerticalTransition";

interface DeviceSettingsProps {}

const devicesOptions = {
  power: { element: <div></div>, icon: <div></div> },
  type: { element: <div></div>, icon: <div></div> },
  configure: { element: <div></div>, icon: <div></div> },
  image_processing: { element: <div></div>, icon: <div></div> },
  idle_animation: { element: <div></div>, icon: <div></div> },
  pin_out: { element: <div></div>, icon: <div></div> },
  brightness: { element: <div></div>, icon: <div></div> },
};

const DeviceSettings: React.FC<DeviceSettingsProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState("");
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <VerticalTransition
        onBack={() => setIsEditing(false)}
        id="device-settings-transition"
        selected={isEditing ? 1 : 0}
      >
        {/* <div className="position-item-container"> */}
        <div className="device-settings-container">
          {Object.keys(devicesOptions).map((option, i) => {
            return (
              <div
                className="device-settings-item"
                onClick={() => {
                  setIsEditing(true);
                  setEditing(option);
                }}
                key={`device-option-${i}-${option}`}
              >
                <div>
                  {option
                    .split("_")
                    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
                    .join(" ")}
                </div>
                <div>on</div>
              </div>
            );
          })}
        </div>
        {/* </div> */}
        <div className="position-item-container">setting</div>
      </VerticalTransition>
    </div>
  );
};

export default DeviceSettings;
