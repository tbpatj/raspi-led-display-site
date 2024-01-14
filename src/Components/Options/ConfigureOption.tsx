import { useContext, useEffect, useRef } from "react";
import { DeviceContext } from "../../Context/DeviceContext";
import { GlobalContext } from "../../Context/GlobalContext";

interface ConfigureOptionProps {}

const ConfigureOption: React.FC<ConfigureOptionProps> = () => {
  const { device } = useContext(DeviceContext);
  const tvRef = useRef<HTMLDivElement>(null);

  return (
    <div className="regular-container">
      <div className="regular-item-list">
        <div ref={tvRef} className="configure-tv"></div>
      </div>
    </div>
  );
};

export default ConfigureOption;
