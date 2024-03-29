import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import FileUpload from "../Input/FileUpload/FileUpload";

const UploadSetting: React.FC = () => {
  const { getModes } = useContext(GlobalContext);
  return (
    <div className="position-item-container">
      <div className="animations-page">
        <h1>Animations</h1>
        <FileUpload
          onFinish={() => getModes()}
          subfile="test"
          id="test-upload"
          uploadTo="/animations/upload"
        />
      </div>
    </div>
  );
};

export default UploadSetting;
