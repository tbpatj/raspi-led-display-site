import { ReactComponent as UploadIcon } from "../../../SVGs/svgs/download.svg";
import { ReactComponent as XIcon } from "../../../SVGs/svgs/x-solid.svg";

interface UploadFileCardProps {
  hasSuccess: boolean;
  hasError: boolean;
  progress: any;
  fileSize: string;
  fileName: string;
  onDelete: () => void;
}

const UploadFileCard: React.FC<UploadFileCardProps> = ({
  progress,
  hasSuccess,
  hasError,
  fileSize,
  fileName,
  onDelete,
}) => {
  return (
    <div
      className={`file-container ${
        hasSuccess ? "success" : hasError ? "error" : ""
      }`}
    >
      <div className="file-info-container">
        <UploadIcon style={{ stroke: "#ece5ec" }} />
        <div className="file-info-seperator-top">
          <div className="file-info-seperator">
            {fileName}
            {(progress === 0 || progress === 100 || isNaN(progress)) && (
              <XIcon
                className="pointer-cursor"
                width={"10px"}
                style={{ fill: "#ece5ec" }}
                onClick={() => onDelete()}
              />
            )}
          </div>
          <div className="file-info-seperator">
            <span className="file-info-text">{fileSize}</span>
            <span className="file-info-text">
              {!isNaN(progress) && !hasError && !hasSuccess
                ? `${progress}%`
                : ""}
            </span>
          </div>
        </div>
      </div>
      <div className="file-upload-progress-container">
        {!hasError && !hasSuccess && !isNaN(progress) && (
          <div
            className="file-upload-progress"
            style={{
              width: `${progress ?? 0}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default UploadFileCard;
