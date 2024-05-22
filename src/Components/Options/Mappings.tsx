import { CSSProperties, useContext } from "react";
import { SettingsContext, StgsCnxtUpFc } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import Input from "../Input/Input";
import { ReactComponent as XIcon } from "../../SVGs/svgs/x-solid.svg";
import { cloneDeep } from "lodash";
import useWinSize from "../../Hooks/useWinSize";
import { Device } from "../../Resources/DeviceResources";
import axios from "axios";

const mappingInputStyle: CSSProperties = { width: "60px" };

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const Mappings: React.FC = () => {
  const { data, update }: { data: Device; update: StgsCnxtUpFc } =
    useContext(SettingsContext);
  const { isSmall } = useWinSize();

  const handleAddMapping = () => {
    const cMapping = cloneDeep(data.settings.mapping);
    const mapping = {
      ledSIndx: 0,
      ledEIndx: 0,
      mapSIndx: 0,
      mapEIndx: 0,
    };
    update([{ path: ["settings", "mapping"], value: [...cMapping, mapping] }]);
  };

  const handleRemoveMapping = (index: number) => () => {
    let curMapping = data.settings.mapping;
    curMapping.splice(index, 1);
    update([{ path: ["settings", "mapping"], value: curMapping }]);
  };

  const handleMappingChange = (type: string, indx: number) => (val: string) => {
    showMappings(indx);
    const isValid = /^[0-9]+$/.test(val);
    if (isValid || val === "") {
      if (val === "") val = "0";
      const mapping = cloneDeep(data.settings.mapping);
      const map = mapping[indx]; // const type = typeof keyof mapping
      mapping[indx][type as keyof typeof map] = parseInt(val);
      update([{ path: ["settings", "mapping"], value: mapping }]);
    }
  };

  const showMappings = async (indx: number) => {
    const options = {
      method: "POST",
      url: baseURL + "/show-mapping/" + data.name,
      data: { index: indx },
    };
    try {
      await axios(options);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="select-menu-container">
      <div className="new-device-list">
        <Button onClick={handleAddMapping}>Add Mapping</Button>
        <div className="mappings-container">
          {data?.settings?.mapping.map((mapping, index) => {
            const showText = index === 0 || isSmall;
            return (
              <div className="mappings-item" key={`mapping-item-${index}`}>
                <div className="mappings-inputs-container">
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
                </div>
                {data?.settings?.mapping.length > 1 && (
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

const MappingRange = () => {};

export default Mappings;
