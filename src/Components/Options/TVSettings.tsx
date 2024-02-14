import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import Input from "../Input/Input";
import { cloneDeep } from "lodash";
import { RGBAddressableTVSettings } from "../../Resources/DeviceUtilResrouces";
import { RGBAddressableDevice } from "../../Resources/DeviceResources";

interface TVSettingsProps {}

interface TVIndexInputs {
  title: "left" | "right" | "top" | "bottom";
}
const defaultTVSettings: RGBAddressableTVSettings = {
  configured: true,
  lefts: 0,
  lefte: 0,
  rights: 0,
  righte: 0,
  tops: 0,
  tope: 0,
  bottoms: 0,
  bottome: 0,
};

const TVIndexInputs: React.FC<TVIndexInputs> = ({ title }) => {
  const { device, updateDevice } = useContext(SettingsContext);

  useEffect(() => {
    if (!(device as RGBAddressableDevice)?.tv_settings) {
      const nDevice = cloneDeep(device as RGBAddressableDevice);
      nDevice.tv_settings = defaultTVSettings;
      updateDevice(nDevice);
    }
  }, [device]);

  const tvSettings = useMemo(() => {
    if ((device as RGBAddressableDevice)?.tv_settings)
      return (device as RGBAddressableDevice)?.tv_settings;
    else {
      return defaultTVSettings;
    }
  }, [device]);
  const initS = useMemo(
    () =>
      //@ts-ignore
      tvSettings[title + "s"],
    [tvSettings]
  );
  const initE = useMemo(
    () =>
      //@ts-ignore
      tvSettings[title + "e"],
    [tvSettings]
  );
  const [indexS, setIndexS] = useState("" + (initS ?? "0"));
  const [indexE, setIndexE] = useState("" + (initE ?? "0"));

  const updateVals = (val: number, type: "s" | "e") => {
    let newD: RGBAddressableDevice = cloneDeep(device as RGBAddressableDevice);
    // @ts-ignore
    newD.tv_settings[title + type] = val;
    if (newD?.tv_settings?.configured === false)
      newD.tv_settings.configured = true;
    updateDevice(newD);
  };

  const handleChange = (index: number) => (val: string) => {
    const isValid = /^[0-9]+$/.test(val);
    if (isValid || val === "") {
      if (index === 0) {
        setIndexS(val);
        if (val === "") val = "0";
        updateVals(parseInt(val), "s");
      } else {
        setIndexE(val);
        if (val === "") val = "0";
        updateVals(parseInt(val), "e");
      }
    }
  };

  return (
    <div>
      <span>{title}</span>
      <div className="config-tv-input-container">
        <Input
          style={{ width: "40%" }}
          value={indexS}
          onChange={handleChange(0)}
        />
        <span>-</span>
        <Input
          style={{ width: "40%" }}
          value={indexE}
          onChange={handleChange(1)}
        />
      </div>
    </div>
  );
};

const TVSettings: React.FC<TVSettingsProps> = () => {
  const tvRef = useRef<HTMLDivElement>(null);

  return (
    <div className="regular-container">
      <div className="regular-item-list">
        <div ref={tvRef} className="configure-tv"></div>
        <TVIndexInputs title="top" />
        <TVIndexInputs title="right" />
        <TVIndexInputs title="left" />
        <TVIndexInputs title="bottom" />
      </div>
    </div>
  );
};

export default TVSettings;
