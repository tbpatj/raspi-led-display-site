import axios from "axios";
import SettingsController from "../Components/Device/SettingsController";
import { defaultTVSettings } from "../Components/TV/SettingsControllerUtil";
import { SettingsContextProvider } from "../Context/SettingsContext";
import { ChangeItem } from "../Resources/JsonChange";
import {
  clientFailureResponse,
  clientSuccessResponse,
} from "../Resources/ServerResponseResources";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { cloneDeep } from "lodash";

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const TVSettingsPage: React.FC = () => {
  const { tv_settings, setTVSettings } = useContext(GlobalContext);

  const handleChange = async (json: any, items: ChangeItem[]) => {
    if (json?.aspect_ratio) {
      const options = {
        method: "POST",
        data: { aspect_ratio: json.aspect_ratio },
        url: baseURL + "/tv/aspect-ratio",
      };
      const res = await axios(options);
      if (res?.data?.status === "success") {
        const newTVSettings = cloneDeep(tv_settings);
        newTVSettings.aspect_ratio = json.aspect_ratio;
        setTVSettings(newTVSettings);
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
        initalJson={tv_settings}
      >
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <SettingsController
            title="TV Settings"
            options={["aspect_ratio", "dead_zone", "frame_processing", "bezel"]}
            settings={defaultTVSettings}
          ></SettingsController>
        </div>
      </SettingsContextProvider>
    </div>
  );
};

export default TVSettingsPage;
