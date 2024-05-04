import { CSSProperties, useContext } from "react";
import { SettingsContext, StgsCnxtUpFc } from "../../Context/SettingsContext";
import Input from "../Input/Input";
import {
  Device,
  RGBAddressableDevice,
  RGBNonAddressableDevice,
} from "../../Resources/DeviceResources";
import { GlobalContext } from "../../Context/GlobalContext";
import { cloneDeep } from "lodash";

const mappingInputStyle: CSSProperties = { width: "60px" };

const FrameProcessing: React.FC = () => {
  const { tv_settings, setTVSettings } = useContext(GlobalContext);

  const handlePaddingChange = (indx: "x" | "y") => (value: string) => {
    const isValid = /^[0-9]+$/.test(value);
    if (isValid || value === "") {
      if (value === "") value = "0";
      const newTVSettings = cloneDeep(tv_settings);
      newTVSettings.padding[indx] = parseInt(value);
      setTVSettings(newTVSettings);
    }
  };

  const handleIterationsChange = (indx: "x" | "y") => (value: string) => {
    const isValid = /^[0-9]+$/.test(value);
    if (isValid || value === "") {
      if (value === "") value = "0";
      const newTVSettings = cloneDeep(tv_settings);
      newTVSettings.iterations[indx] = parseInt(value);
      setTVSettings(newTVSettings);
    }
  };

  return (
    <div className="select-menu-container">
      <div className="new-device-list">
        <h1>Frame Processing</h1>

        {/* Padding */}
        <h3>Padding</h3>
        <div className="mappings-inputs-container">
          <div className="mappings-item-section">
            <div className="mapping-item">
              <span style={{ textAlign: "center" }}>X</span>
              <Input
                onChange={handlePaddingChange("x")}
                value={tv_settings.padding.x}
                type="number"
                style={mappingInputStyle}
              ></Input>
            </div>
            <div className="mapping-item">
              <span style={{ textAlign: "center" }}>Y</span>
              <Input
                onChange={handlePaddingChange("y")}
                value={tv_settings.padding.y}
                type="number"
                style={mappingInputStyle}
              ></Input>
            </div>
          </div>
        </div>

        {/* Iterations */}
        <h3>Iterations</h3>
        <div className="mappings-inputs-container">
          <div className="mappings-item-section">
            <div className="mapping-item">
              <span style={{ textAlign: "center" }}>X</span>
              <Input
                onChange={handleIterationsChange("x")}
                value={tv_settings.iterations.x}
                type="number"
                style={mappingInputStyle}
              ></Input>
            </div>
            <div className="mapping-item">
              <span style={{ textAlign: "center" }}>Y</span>
              <Input
                onChange={handleIterationsChange("y")}
                value={tv_settings.iterations.y}
                type="number"
                style={mappingInputStyle}
              ></Input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameProcessing;
