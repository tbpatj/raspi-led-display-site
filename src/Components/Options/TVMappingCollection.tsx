import { CSSProperties, useContext, useMemo } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { SettingsContext, StgsCnxtUpFc } from "../../Context/SettingsContext";
import { Device } from "../../Resources/DeviceResources";
import { cloneDeep } from "lodash";

interface TVMappingCollectionProps {
  index: number;
  showMappings: (indx: number) => void;
}

const TVMappingCollection: React.FC<TVMappingCollectionProps> = ({
  index,
  showMappings,
}) => {
  const { data, update }: { data: Device; update: StgsCnxtUpFc } =
    useContext(SettingsContext);
  const { tv_mappings } = useContext(GlobalContext);

  const handleChange = (startI: number, endI: number) => {
    showMappings(index);
    const mapping = cloneDeep(data.settings.mapping);
    mapping[index]["mapSIndx"] = startI;
    mapping[index]["mapEIndx"] = endI;
    update([{ path: ["settings", "mapping"], value: mapping }]);
  };

  const currentMapS = useMemo(
    () => data.settings.mapping[index].mapSIndx,
    [data]
  );

  const currentMapE = useMemo(
    () => data.settings.mapping[index].mapEIndx,
    [data]
  );

  return (
    <div
      className="tv-mapping-collection"
      style={
        index === 0
          ? {
              paddingTop: "24px",
            }
          : {}
      }
    >
      <TVMappingButton
        onClick={handleChange}
        startI={tv_mappings.leftS}
        endI={tv_mappings.leftE}
        currentMappingS={currentMapS}
        className="left"
      >
        Left
      </TVMappingButton>
      <div className="tv-mapping-sub-collection">
        <TVMappingButton
          onClick={handleChange}
          startI={tv_mappings.topS}
          endI={tv_mappings.topE}
          currentMappingS={currentMapS}
          style={{ height: "50%" }}
          className="middle"
        >
          Top
        </TVMappingButton>
        <TVMappingButton
          onClick={handleChange}
          startI={tv_mappings.bottomS}
          endI={tv_mappings.bottomE}
          currentMappingS={currentMapS}
          style={{ height: "50%" }}
          className="middle bottom"
        >
          Bottom
        </TVMappingButton>
      </div>
      <TVMappingButton
        onClick={handleChange}
        startI={tv_mappings.rightS}
        endI={tv_mappings.rightE}
        currentMappingS={currentMapS}
        className="right"
      >
        Right
      </TVMappingButton>
      <TVReverseMapping
        style={{ marginLeft: "10px" }}
        reversed={currentMapS > currentMapE}
        onClick={() => {
          handleChange(currentMapE, currentMapS);
        }}
      >
        Reverse
      </TVReverseMapping>
    </div>
  );
};

interface TVReverseMappingProps {
  reversed?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick: () => void;
  children?: string;
}

const TVReverseMapping: React.FC<TVReverseMappingProps> = ({
  reversed,
  onClick,
  children,
  className,
  style,
}) => {
  return (
    <button
      className={`tv-mapping-button${reversed ? " selected" : ""} ${
        className || ""
      }`}
      onClick={() => onClick()}
      style={style}
    >
      {children}
    </button>
  );
};

interface TVMappingButtonProps {
  onClick: (startI: number, endI: number) => void;
  startI: number;
  endI: number;
  currentMappingS: number;
  style?: CSSProperties;
  className?: string;
  children?: string;
}

const TVMappingButton: React.FC<TVMappingButtonProps> = ({
  children,
  onClick,
  startI,
  endI,
  currentMappingS,
  style,
  className,
}) => {
  const isSelected = useMemo(
    () => currentMappingS === startI || currentMappingS === endI,
    [currentMappingS, startI, endI]
  );
  return (
    <button
      className={`tv-mapping-button${isSelected ? " selected" : ""} ${
        className || ""
      }`}
      onClick={() => onClick(startI, endI)}
      style={style}
    >
      {children}
    </button>
  );
};

export default TVMappingCollection;
