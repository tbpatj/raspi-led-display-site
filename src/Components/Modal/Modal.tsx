import { CSSProperties, useMemo } from "react";
import ReactDom from "react-dom";
import { ReactComponent as XIcon } from "../../SVGs/svgs/x-solid.svg";

interface ModalProps {
  opened: boolean;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: CSSProperties;
  title?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  opened,
  children,
  className,
  style,
  title,
  onClose,
}) => {
  const portal = useMemo(() => document.getElementById("portal"), []);
  if (!portal) return <></>;
  if (!opened) return <></>;
  return ReactDom.createPortal(
    <div className="modal-position-container">
      <div
        className={`modal-container modal-sizing ${className ?? ""}`}
        style={style}
      >
        <div
          className="modal-sizing"
          style={{
            position: "relative",
            padding: title ? "25px 0px" : "0px",
          }}
        >
          {title && <div className="modal-title">{title}</div>}
          {onClose && (
            <div onClick={() => onClose()} className="modal-close">
              <XIcon width={14} height={16} />
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </div>,
    portal
  );
};

export default Modal;
