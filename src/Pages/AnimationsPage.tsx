import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { SettingsContextProvider } from "../Context/SettingsContext";
import {
  clientFailureResponse,
  clientSuccessResponse,
} from "../Resources/ServerResponseResources";
import SettingsController from "../Components/Device/SettingsController";
import useAnimationSettings from "../Hooks/SettingsController/useAnimationSettings";
import { ChangeItem } from "../Resources/JsonChange";
import useFetcher from "../Hooks/useFetcher";
import DeleteModal from "../Components/Modal/DeleteModal";

const AnimationsPage: React.FC = () => {
  const { getModes } = useContext(GlobalContext);
  const { settings } = useAnimationSettings();
  const { fetcher } = useFetcher({});
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [animationName, setAnimationName] = useState("");

  const handleAnimationDelete = async () => {
    setDeleteModalOpened(false);
    const response = await fetcher("/animations/" + animationName, {
      method: "DELETE",
    });
    if (response.data.status === "success") {
      getModes();
    }
  };

  const handleChange = async (json: any, items: ChangeItem[]) => {
    if (json?.delete) {
      setAnimationName(json.delete);
      setDeleteModalOpened(true);
    }
    return clientSuccessResponse;
  };

  return (
    <div>
      <DeleteModal
        title={`Delete ${animationName}`}
        opened={deleteModalOpened}
        onConfirm={handleAnimationDelete}
        onClose={() => setDeleteModalOpened(false)}
      />
      <SettingsContextProvider
        onChange={handleChange}
        onCommand={async () => clientFailureResponse}
        initalJson={{}}
      >
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <SettingsController
            title="Animations"
            options={["upload", "delete"]}
            settings={settings}
          ></SettingsController>
        </div>
      </SettingsContextProvider>
    </div>
  );
};

export default AnimationsPage;
