import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import useFetcher from "../useFetcher";

interface UseUploadHandlerProps {
  route: string;
  uploadName?: string;
  subfile?: string;
  onFinish?: () => void;
}

interface UseUploadHandler {
  fileProgress: { [key: string]: string };
  upload: (files: FileList | File[]) => any;
  error: string;
  deleteFile: (i: number) => void;
  filesProgress: string;
  reset: () => void;
}

const useUploadHandler: (props: UseUploadHandlerProps) => UseUploadHandler = ({
  route,
  uploadName = "file",
  subfile,
  onFinish,
}) => {
  const { fetcher } = useFetcher({});
  const [fileProgress, setFileProgress] = useState<{ [key: string]: string }>(
    {}
  );
  const [filesProgress, setFilesProgress] = useState<string>("");
  const [error, setError] = useState("");

  const reportProgress = (id: any) => (progressEvent: ProgressEvent) => {
    const progress = Math.round(
      Number((progressEvent.loaded * 100) / (progressEvent?.total || 1))
    );
    if (progress) {
      setFileProgress((currentFileProgress) => {
        const newFileProgress = { ...currentFileProgress };
        newFileProgress[id] = `${progress}`;
        return newFileProgress;
      });
    }
  };

  useEffect(() => {
    let found = false;
    for (let i = 0; i < Object.keys(fileProgress).length; i++) {
      const prog = fileProgress?.[i];
      if (
        prog !== "100" &&
        prog !== "" &&
        !prog?.includes("error") &&
        prog !== "success"
      ) {
        found = true;
      }
    }
    if (found) setFilesProgress("uploading");
    else setFilesProgress("done");
  }, [fileProgress]);

  const reset = () => {
    setFilesProgress("");
    setFileProgress({});
  };

  const handleThen = (i: number) => (response: AxiosResponse) => {
    setFileProgress((currentFileProgress) => {
      const newFileProgress = { ...currentFileProgress };
      newFileProgress[i] = `success`;
      return newFileProgress;
    });
    onFinish?.();
  };

  const handleError = (i: number) => (reason: any) => {
    setFileProgress((currentFileProgress) => {
      const newFileProgress = { ...currentFileProgress };
      newFileProgress[i] = `error: ${reason.code}`;
      return newFileProgress;
    });
  };

  const deleteFile = (di: number) => {
    setFileProgress((fileProg) => {
      const newFileProg = { ...fileProg };
      const keys = Object.keys(fileProgress);
      for (let i = 0; i < keys.length; i++) {
        if (i > di && i !== 0) {
          newFileProg[i - 1] = newFileProg?.[i];
          delete newFileProg[i];
        }
        if (i === di) {
          delete newFileProg[i];
        }
      }
      return newFileProg;
    });
  };

  const upload = async (files: FileList | File[]) => {
    setError("");
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      console.log("upload name", uploadName);
      formData.append(uploadName, files[i]);

      const config = {
        onUploadProgress: reportProgress(i),
      };
      await fetcher(
        route,
        {
          method: "POST",
          headers: {
            //@ts-ignore
            "Content-Type": `multipart/form-data`,
          },
          body: formData,
          params: { subfile },
          config,
        },
        handleThen(i),
        handleError(i)
      );
    }
  };

  return { fileProgress, upload, error, deleteFile, filesProgress, reset };
};

export default useUploadHandler;
