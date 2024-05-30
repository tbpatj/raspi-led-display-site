import axios from "axios";
import SettingsController from "../Components/Device/SettingsController";
import { defaultSettings } from "../Components/Device/SettingsControllerUtil";
import { defaultTVSettings } from "../Components/TV/SettingsControllerUtil";
import { SettingsContextProvider } from "../Context/SettingsContext";
import { ChangeItem } from "../Resources/JsonChange";
import {
  clientFailureResponse,
  clientSuccessResponse,
} from "../Resources/ServerResponseResources";

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const TVSettingsPage: React.FC = () => {
  const handleChange = async (json: any, items: ChangeItem[]) => {
    if (json?.settings?.aspect_ratio) {
      const options = {
        method: "POST",
        data: { aspect_ratio: json.settings.aspect_ratio },
        url: baseURL + "/tv/aspect-ratio",
      };
      const res = await axios(options);
      if (res?.data?.status === "success") {
        return clientSuccessResponse;
      }
    }
    return clientFailureResponse;
  };

  return (
    <div>
      <SettingsContextProvider
        onChange={handleChange}
        onCommand={async () => clientFailureResponse}
        initalJson={{}}
      >
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <SettingsController
            title="TV Settings"
            options={["aspect_ratio", "dead_zone", "frame_processing"]}
            settings={defaultTVSettings}
          ></SettingsController>
        </div>
      </SettingsContextProvider>
    </div>
  );
};

export default TVSettingsPage;
