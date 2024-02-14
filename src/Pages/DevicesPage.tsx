import { useContext, useState } from "react";
import Card from "../Components/Cards/Card";
import AddIcon from "../SVGs/AddIcon";
import VerticalTransition from "../Components/TransitionContainers/VerticalTransition";
import NewDevice from "../Components/Device/NewDevice";
import { Devices } from "../Resources/DeviceResources";
import { GlobalContext } from "../Context/GlobalContext";
import PresetSettings from "../Components/Device/PresetSettings";
import { SettingsContextProvider } from "../Context/SettingsContext";

const DevicesPage = () => {
  const [editing, setEditing] = useState(0);
  const [editingOpen, setEditingOpen] = useState(false);
  const { devices } = useContext(GlobalContext);
  return (
    <VerticalTransition
      onBack={() => setEditingOpen(false)}
      id="devices-transition-top"
      selected={editingOpen === false ? 0 : 1}
    >
      <div className="position-item-container">
        <div className="devices-page">
          <h1>Devices</h1>
          <div className="devices-container">
            {devices.map((device: Devices, index: number) => {
              return (
                <Card
                  text={device.name}
                  onClick={() => {
                    setEditingOpen(true);
                    setEditing(1);
                  }}
                  icon={<AddIcon width="60" height="60" />}
                />
              );
            })}
            <Card
              text="Add New Device"
              onClick={() => {
                setEditingOpen(true);
                setEditing(2);
              }}
              icon={<AddIcon width="60" height="60" />}
            />
          </div>
        </div>
      </div>
      <div>
        {editing === 1 && (
          <div
            style={{ position: "relative", width: "100vw", height: "100vh" }}
          >
            <SettingsContextProvider>
              <PresetSettings />
            </SettingsContextProvider>
          </div>
        )}
        {editing === 2 && (
          <div
            style={{ position: "relative", width: "100vw", height: "100vh" }}
          >
            <SettingsContextProvider>
              <NewDevice
                onFinish={() => {
                  setEditingOpen(false);
                }}
              />
            </SettingsContextProvider>
          </div>
        )}
      </div>
    </VerticalTransition>
  );
};

export default DevicesPage;
