import { useContext, useState } from "react";
import Card from "../Components/Cards/Card";
import VerticalTransition from "../Components/TransitionContainers/VerticalTransition";
import NewDevice from "../Components/Device/NewDevice";
import { Devices } from "../Resources/DeviceResources";
import { GlobalContext } from "../Context/GlobalContext";
import PresetSettings from "../Components/Device/PresetSettings";
import { SettingsContextProvider } from "../Context/SettingsContext";
import { DeviceSVGMap } from "../Utils/DeviceSVGMap";

const DevicesPage = () => {
  const [editing, setEditing] = useState(0);
  const [editingOpen, setEditingOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const { devices, presets } = useContext(GlobalContext);
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
                    setEditingIndex(index);
                    setEditingOpen(true);
                    setEditing(1);
                  }}
                  icon={DeviceSVGMap(device.type)}
                />
              );
            })}
            <Card
              text="Add New Device"
              onClick={() => {
                setEditingOpen(true);
                setEditing(2);
              }}
              icon={DeviceSVGMap("new-device")}
            />
          </div>
        </div>
      </div>
      <div>
        {editing === 1 && (
          <div
            style={{ position: "relative", width: "100vw", height: "100vh" }}
          >
            <SettingsContextProvider
              selectedDevice={editingIndex}
              initialPreset={presets.find((val) => {
                if (
                  val.name === devices[editingIndex].preset &&
                  val.type === devices[editingIndex].type
                )
                  return val;
              })}
              setEditingOpen={setEditingOpen}
            >
              <PresetSettings />
            </SettingsContextProvider>
          </div>
        )}
        {editing === 2 && (
          <div
            style={{ position: "relative", width: "100vw", height: "100vh" }}
          >
            <SettingsContextProvider setEditingOpen={setEditingOpen}>
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
