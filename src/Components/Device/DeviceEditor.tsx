import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { SettingsContextProvider } from "../../Context/SettingsContext";
import DeviceControllerContainer from "./DeviceControllerContainer";
import { Device } from "../../Resources/DeviceResources";

interface DeviceEditorProps {
  index: number;
}

const DeviceEditor: React.FC<DeviceEditorProps> = ({ index }) => {
  const { devices, updateDevice } = useContext(GlobalContext);
  const handleChange = (json: Device) => {
    console.log(json);
    updateDevice(index, json);
  };
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <SettingsContextProvider
        initalJson={devices[index]}
        onChange={handleChange}
        onCommand={() => null}
      >
        <DeviceControllerContainer />
      </SettingsContextProvider>
    </div>
  );
};

export default DeviceEditor;
