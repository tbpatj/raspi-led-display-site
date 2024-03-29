import Button from "../Input/Button";
import Modal from "./Modal";

interface DeleteModalProps {
  title: string;
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  opened,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="delete-modal-container">
        <div className="delete-text-container">
          <h2>{title}</h2>
          <div>Are you sure?</div>
        </div>
        <div className="delete-flex-container">
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onClose}>No</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
