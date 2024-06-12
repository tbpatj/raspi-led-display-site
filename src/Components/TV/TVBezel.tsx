import { cloneDeep } from "lodash";
import { CSSProperties, useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import DecInput from "../Input/DecInput";
import Button from "../Input/Button";
import Modal from "../Modal/Modal";

const mappingInputStyle: CSSProperties = { width: "120px" };

const TVBezel: React.FC = ({}) => {
  const { tv_settings, setTVSettings } = useContext(GlobalContext);
  const [bezelModal, setBezelModal] = useState(0);
  const [modalVal1, setModalVal1] = useState(0);
  const [modalVal2, setModalVal2] = useState(0);

  const handlePaddingChange = (indx: "x" | "y") => (value: number) => {
    const newTVSettings = cloneDeep(tv_settings);
    newTVSettings.bezel[indx] = value;
    setTVSettings(newTVSettings);
  };

  const CalcBezel = () => {
    const ratio = modalVal2 / (modalVal1 || 1);
    console.log(ratio, modalVal1, modalVal2);
    const newTVSettings = cloneDeep(tv_settings);
    if (bezelModal === 1) {
      newTVSettings.bezel.x = ratio;
      setBezelModal(2);
      setModalVal1(0);
      setModalVal2(0);
    } else if (bezelModal === 2) {
      newTVSettings.bezel.y = ratio;
      setBezelModal(0);
    }
    setTVSettings(newTVSettings);
  };

  const onCalculate = () => {
    setBezelModal(1);
  };

  return (
    <div className="select-menu-container">
      <Modal onClose={() => setBezelModal(0)} opened={bezelModal > 0}>
        <div className="mappings-container tv-bezel-modal">
          <h1 className="basic-color">Bezel Calculator</h1>
          <h3 className="basic-color">
            Measure the length of your screen and bezel in what ever unit as
            long as they are both measured in the same unit.
          </h3>
          <h3 className="basic-color">
            Screen {bezelModal === 1 ? "Width" : "Height"}
          </h3>
          <DecInput value={modalVal1} onChange={setModalVal1}></DecInput>
          <h3 className="basic-color">
            {bezelModal === 1
              ? "Left and Right Bezel Width"
              : "Top and Bottom Bezel Height"}
          </h3>
          <DecInput value={modalVal2} onChange={setModalVal2}></DecInput>
          <Button onClick={CalcBezel}>
            {bezelModal === 1 ? "Next" : "Finish"}
          </Button>
        </div>
      </Modal>
      <div className="new-device-list">
        <h1>TV Bezel</h1>
        <div className="mappings-inputs-container">
          <div className="mappings-item-section">
            <div className="mapping-item">
              <span style={{ textAlign: "center" }}>X</span>
              <DecInput
                decimals={4}
                onChange={handlePaddingChange("x")}
                value={tv_settings.bezel.x}
                style={mappingInputStyle}
              ></DecInput>
            </div>
            <div className="mapping-item">
              <span style={{ textAlign: "center" }}>Y</span>
              <DecInput
                decimals={4}
                onChange={handlePaddingChange("y")}
                value={tv_settings.bezel.y}
                style={mappingInputStyle}
              ></DecInput>
            </div>
          </div>
        </div>
        <Button onClick={onCalculate}>Calculate Bezel</Button>
      </div>
    </div>
  );
};

export default TVBezel;
