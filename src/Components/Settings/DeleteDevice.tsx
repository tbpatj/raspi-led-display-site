import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import { GlobalContext } from "../../Context/GlobalContext";
import Modal from "../Modal/Modal";

const DeleteDevice = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { device, updateDevice, toggleEditingNav } =
    useContext(SettingsContext);
  const { addDevice } = useContext(GlobalContext);

  useEffect(() => {
    return () => {
      setModalOpened(false);
    };
  }, []);

  const handleClick = () => {
    // deleteDevice();
    setModalOpened(true);
    // toggleEditingNav();
  };

  const handleDelete = () => {
    // addDevice(device);
    toggleEditingNav();
  };

  return (
    <div className="new-device-container">
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
      >
        <div className="delete-modal-container">
          <div className="delete-text-container">
            <h2>Delete Device</h2>
            <div>Are you sure?</div>
          </div>
          <div className="delete-flex-container">
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={() => setModalOpened(false)}>No</Button>
          </div>
        </div>
      </Modal>
      <Button className="delete-button" onClick={() => handleClick()}>
        Delete Device
      </Button>
    </div>
  );
};

export default DeleteDevice;
