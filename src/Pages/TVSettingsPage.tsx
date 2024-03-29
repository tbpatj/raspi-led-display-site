import SettingsController from "../Components/Device/SettingsController";
import { defaultSettings } from "../Components/Device/SettingsControllerUtil";
import { defaultTVSettings } from "../Components/TV/SettingsControllerUtil";
import { SettingsContextProvider } from "../Context/SettingsContext";
import { clientFailureResponse } from "../Resources/ServerResponseResources";

const TVSettingsPage: React.FC = () => {
  return (
    <div>
      <SettingsContextProvider
        onChange={async () => clientFailureResponse}
        onCommand={async () => clientFailureResponse}
        initalJson={{}}
      >
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <SettingsController
            options={["aspect_ratio", "power"]}
            settings={defaultTVSettings}
          ></SettingsController>
        </div>
      </SettingsContextProvider>
    </div>
  );
};

export default TVSettingsPage;