import { CSSProperties, useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import Input from "../Input/Input";
import { ReactComponent as XIcon } from "../../SVGs/svgs/x-solid.svg";
import { Mapping } from "../../Resources/PresetResources";
import { cloneDeep } from "lodash";

const mappingInputStyle: CSSProperties = { width: "60px" };

const Mappings: React.FC = () => {
  const { preset, updatePreset } = useContext(SettingsContext);

  const handleAddMapping = () => {
    const nPreset = cloneDeep(preset);
    nPreset.mapping.push({
      ledSIndx: 0,
      ledEIndx: 0,
      mapSIndx: 0,
      mapEIndx: 0,
    });
    updatePreset(nPreset);
  };

  const handleRemoveMapping = (index: number) => () => {
    const nPreset = cloneDeep(preset);
    nPreset.mapping.splice(index, 1);
    updatePreset(nPreset);
  };

  const handleMappingChange = (type: string, indx: number) => (val: string) => {
    const isValid = /^[0-9]+$/.test(val);
    if (isValid || val === "") {
      if (val === "") val = "0";
      const nPreset = cloneDeep(preset);
      const map = nPreset.mapping[indx];
      // const type = typeof keyof mapping
      nPreset.mapping[indx][type as keyof typeof map] = parseInt(val);
      updatePreset(nPreset);
    }
  };

  return (
    <div className="new-device-container">
      <div className="new-device-list">
        <Button onClick={handleAddMapping}>Add Mapping</Button>
        <div className="mappings-container">
          {preset?.mapping.map((mapping, index) => {
            const showText = index === 0;
            return (
              <div className="mappings-item" key={`mapping-item-${index}`}>
                <div className="mappings-item-section">
                  <div className="mapping-item">
                    {showText && <span>Led Start</span>}
                    <Input
                      onChange={handleMappingChange("ledSIndx", index)}
                      value={String(mapping.ledSIndx)}
                      style={mappingInputStyle}
                    ></Input>
                  </div>
                  <div className="mapping-item">
                    {showText && <span>Led End</span>}
                    <Input
                      onChange={handleMappingChange("ledEIndx", index)}
                      value={String(mapping.ledEIndx)}
                      style={mappingInputStyle}
                    ></Input>
                  </div>
                </div>
                <div className="mappings-item-section">
                  <div className="mapping-item">
                    {showText && <span>Map Start</span>}
                    <Input
                      onChange={handleMappingChange("mapSIndx", index)}
                      value={String(mapping.mapSIndx)}
                      style={mappingInputStyle}
                    ></Input>
                  </div>
                  <div className="mapping-item">
                    {showText && <span>Map End</span>}
                    <Input
                      onChange={handleMappingChange("mapEIndx", index)}
                      value={String(mapping.mapEIndx)}
                      style={mappingInputStyle}
                    ></Input>
                  </div>
                </div>
                {preset?.mapping.length > 1 && (
                  <XIcon
                    onClick={handleRemoveMapping(index)}
                    style={{ cursor: "pointer" }}
                    width={20}
                    fill="#ece5ec"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mappings;
