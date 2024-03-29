import { useContext, useEffect, useState } from "react";
import { SettingsContext, StgsCnxtCmdFc } from "../../Context/SettingsContext";
import Button from "../Input/Button";
import { GlobalContext } from "../../Context/GlobalContext";
import Modal from "../Modal/Modal";
import { Device } from "../../Resources/DeviceResources";
import DeleteModal from "../Modal/DeleteModal";

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
      setModalOpened(false);
      command({ val: "toggle-nav" });
    }
  };

  return (
    <>
      <DeleteModal
        title="Delete Device"
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
        onConfirm={handleDelete}
      />
      <Button className="delete-button" onClick={() => handleClick()}>
        Delete Device
      </Button>
    </>
  );
};

export default DeleteDevice;
