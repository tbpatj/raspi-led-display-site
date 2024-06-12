import { cloneDeep } from "lodash";
import { CSSProperties, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import DecInput from "../Input/DecInput";

const TVDeadzone: React.FC = () => {
  const { tv_settings, setTVSettings } = useContext(GlobalContext);

  const handleTChange = (value: number) => {
    const newTVSettings = cloneDeep(tv_settings);
    newTVSettings.deadzone.threshold = value;
    setTVSettings(newTVSettings);
  };

  const handleDChange = (value: number) => {
    const newTVSettings = cloneDeep(tv_settings);
    newTVSettings.deadzone.decrease = value;
    setTVSettings(newTVSettings);
  };

  const handlePChange = (value: number) => {
    const newTVSettings = cloneDeep(tv_settings);
    newTVSettings.deadzone.power = value;
    setTVSettings(newTVSettings);
  };

  return (
    <div className="select-menu-container">
      <div className="new-device-list">
        <h1>TV Deadzone</h1>

        {/* Bezel */}
        <h3>Threshold</h3>
        <div className="mappings-inputs-container">
          <div className="mappings-item-section">
            <div className="mapping-item">
              <DecInput
                decimals={0}
                onChange={handleTChange}
                value={tv_settings.deadzone.threshold}
              ></DecInput>
            </div>
          </div>
        </div>
        <h3>Decrease</h3>
        <div className="mappings-inputs-container">
          <div className="mappings-item-section">
            <div className="mapping-item">
              <DecInput
                decimals={4}
                onChange={handleDChange}
                value={tv_settings.deadzone.decrease}
              ></DecInput>
            </div>
          </div>
        </div>
        <h3>Power</h3>
        <div className="mappings-inputs-container">
          <div className="mappings-item-section">
            <div className="mapping-item">
              <DecInput
                decimals={4}
                onChange={handlePChange}
                value={tv_settings.deadzone.power}
              ></DecInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDeadzone;
