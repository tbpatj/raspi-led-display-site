import { CSSProperties, useEffect, useState } from "react";
import { ReactComponent as UploadIcon } from "../../../SVGs/svgs/download.svg";
import UploadFileCard from "./UploadFileCard";
import { humanFileSize } from "./Utils";
import useUploadHandler from "../../../Hooks/FileUpload/useUploadHandler";
import Button from "../Button";
import Error from "../Error";

interface FileUploadProps {
  id: string;
  onChange?: (files: File[]) => void;
  style?: CSSProperties;
  className?: string;
  uploadTo?: string;
  onFinish?: () => void;
  uploadName?: string;
  subfile?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  className,
  style,
  onChange,
  uploadTo,
  uploadName = "file",
  subfile,
  onFinish,
}) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { upload, fileProgress, error, deleteFile, filesProgress, reset } =
    useUploadHandler({
      route: uploadTo ?? "",
      uploadName,
      subfile,
      onFinish,
    });

  const handleDragEnter = () => {
    if (dragging === false) {
      setDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = () => {
    if (dragging === true) {
      setDragging(false);
    }
  };

  const updateFiles = (dataFiles: FileList) => {
    const curFiles = [...files];
    let removed = 0;
    for (let i = 0; i < files.length; i++) {
      if (fileProgress?.[i] === "success" || fileProgress?.[i] === "100") {
        curFiles.splice(i - removed, 1);
        removed++;
      }
    }
    reset();
    let newFiles: File[] = [];
    Array.from(dataFiles).forEach((val) => {
      newFiles.push(val);
    });

    setFiles([...curFiles, ...newFiles]);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    e.nativeEvent.preventDefault();
    e.stopPropagation();
    e.preventDefault();
    updateFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files) {
      updateFiles(files);
    }
  };

  const handleFileDelete = (i: number) => {
    const newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles(newFiles);
    deleteFile(i);
  };

  const handleSuccessFileDelete = (i: number) => {
    setUploadedFiles((upFiles) => {
      const newFiles = [...upFiles];
      newFiles.splice(i, 1);
      return newFiles;
    });
  };

  useEffect(() => {
    onChange?.(files);
  }, [files]);

  const handleUploadClick = () => {
    const curFiles = [...files];
    let removed = 0;
    for (let i = 0; i < files.length; i++) {
      if (fileProgress?.[i] === "success" || fileProgress?.[i] === "100") {
        curFiles.splice(i - removed, 1);
        removed++;
      }
    }
    reset();
    setFiles(curFiles);
    upload(curFiles);
  };

  return (
    <div className={`drag-n-drop-container ${className ?? ""}`} style={style}>
      <div
        className={`drop-section-container ${
          dragging ? "drop-section-dragging" : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
      >
        <UploadIcon style={{ pointerEvents: "none", stroke: "#ece5ec" }} />
        <div style={{ pointerEvents: "none" }}>
          Drag & Drop or{" "}
          <label
            style={{
              pointerEvents: dragging ? "none" : "auto",
              cursor: "pointer",
            }}
            htmlFor={id}
            className="drag-n-drop-label"
          >
            Choose Files
            <input
              className="drag-n-drop-input"
              id={id}
              type="file"
              multiple
              onChange={handleFileSelect}
            ></input>
          </label>{" "}
          to upload
        </div>
      </div>
      <div className="file-section-container">
        {files.map((val, i) => {
          const name = val.name;
          const size = humanFileSize(val.size);
          const progress = Number(fileProgress?.[i]);
          const hasError = fileProgress?.[i]?.includes("error");
          const hasSuccess = fileProgress?.[i]?.includes("success");
          return (
            <UploadFileCard
              onDelete={() => handleFileDelete(i)}
              key={`uploaded-file-${i}-${name}`}
              fileName={name}
              fileSize={size}
              progress={progress}
              hasError={hasError}
              hasSuccess={hasSuccess}
            />
          );
        })}
        {uploadedFiles.map((val, i) => {
          const name = val?.name;
          const size = humanFileSize(val?.size);
          const progress = NaN;
          const hasError = false;
          const hasSuccess = true;

          return (
            <UploadFileCard
              onDelete={() => handleSuccessFileDelete(i)}
              key={`uploaded-file-${i}-${name}`}
              fileName={name}
              fileSize={size}
              progress={progress}
              hasError={hasError}
              hasSuccess={hasSuccess}
            />
          );
        })}
      </div>
      {error && <Error>{error}</Error>}
      {uploadTo && (
        <Button
          disabled={files.length === 0 || filesProgress === "uploading"}
          onClick={handleUploadClick}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
