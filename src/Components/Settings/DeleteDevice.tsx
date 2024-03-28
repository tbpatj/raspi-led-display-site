import { useContext, useEffect, useState } from "react";
import { SettingsContext, StgsCnxtCmdFc } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import { GlobalContext } from "../../Context/GlobalContext";
import Modal from "../Modal/Modal";
import { Device } from "../../Resources/DeviceResources";

const DeleteDevice = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { data: device, command }: { data: Device; command: StgsCnxtCmdFc } =
    useContext(SettingsContext);
  // const { deleteDevice } = useContext(GlobalContext);

  useEffect(() => {
    return () => {
      setModalOpened(false);
    };
  }, []);

  const handleClick = () => {
    setModalOpened(true);
  };

  const handleDelete = async () => {
    const response = await command({
      val: "delete",
      data: { name: device?.name, type: device?.type },
    });
    if (response.status === "error") {
    } else {
      command({ val: "toggle-nav" });
    }
  };

  return (
    <>
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
    </>
  );
};

export default DeleteDevice;
