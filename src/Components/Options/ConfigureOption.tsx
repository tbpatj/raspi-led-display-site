import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DeviceContext } from "../../Context/DeviceContext";
import Input from "../Input/Input";
import { RGBAddressableStripPreset } from "../../Resources/DataStructure";
import { cloneDeep } from "lodash";

interface ConfigureOptionProps {}

interface ConfigIndexInputs {
  title: "left" | "right" | "top" | "bottom";
}

const ConfigIndexInputs: React.FC<ConfigIndexInputs> = ({ title }) => {
  const { device, preset, updateDevice } = useContext(DeviceContext);
  const config = useMemo(() => {
    return (device.presets[preset] as RGBAddressableStripPreset).configure;
  }, [device, preset]);
  const initS = useMemo(
    () =>
      //@ts-ignore
      config[title + "s"],
    [config]
  );
  const initE = useMemo(
    () =>
      //@ts-ignore
      config[title + "e"],
    [config]
  );
  const [indexS, setIndexS] = useState("" + (initS ?? "0"));
  const [indexE, setIndexE] = useState("" + (initE ?? "0"));

  const updateVals = (val: number, type: "s" | "e") => {
    let newD = cloneDeep(device);
    // @ts-ignore
    (newD.presets[preset] as RGBAddressableStripPreset).configure[
      title + type
    ] = val;
    if (
      (newD.presets[preset] as RGBAddressableStripPreset).configure
        .configured === false
    ) {
      (newD.presets[preset] as RGBAddressableStripPreset).configure.configured =
        true;
    }
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

const ConfigureOption: React.FC<ConfigureOptionProps> = () => {
  const tvRef = useRef<HTMLDivElement>(null);

  return (
    <div className="regular-container">
      <div className="regular-item-list">
        <div ref={tvRef} className="configure-tv"></div>
        <ConfigIndexInputs title="top" />
        <ConfigIndexInputs title="right" />
        <ConfigIndexInputs title="left" />
        <ConfigIndexInputs title="bottom" />
      </div>
    </div>
  );
};

export default ConfigureOption;
