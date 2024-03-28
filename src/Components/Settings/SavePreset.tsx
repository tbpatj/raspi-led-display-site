import { useContext, useState } from "react";
import Button from "../Input/Button";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import { SettingsContext } from "../../Context/SettingsContext";

const SavePreset: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  // const { savePreset } = useContext(SettingsContext);

  const handleSaveButton = () => {
    // savePreset(presetName);
  };

  return (
    <>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <div
          style={{
            maxWidth: "400px",
            width: "calc(90vw - 20px)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div>Save Preset As</div>
          <Input
            value={presetName}
            onChange={(val: string) => setPresetName(val)}
          />
          <Button onClick={handleSaveButton}>Save</Button>
        </div>
      </Modal>
      <Button onClick={() => setModalOpen(true)}>Save Preset</Button>
    </>
  );
};

export default SavePreset;
