import { useContext, useState } from "react";
import Card from "../Components/Cards/Card";
import AddIcon from "../SVGs/AddIcon";
import VerticalTransition from "../Components/TransitionContainers/VerticalTransition";
import DeviceSettings from "../Components/Device/DeviceSettings";
import NewDevice from "../Components/Device/NewDevice";
import { DeviceContextProvider } from "../Context/DeviceContext";
import { Devices } from "../Resources/DeviceResources";
import { GlobalContext } from "../Context/GlobalContext";

const DevicesPage = () => {
  const [editing, setEditing] = useState(0);
  const [editingOpen, setEditingOpen] = useState(false);
  const { devices } = useContext(GlobalContext);

  const [test, setTest] = useState(0);
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
            <Card
              text="Add New Device"
              onClick={() => {
                setEditingOpen(true);
                setEditing(2);
              }}
              icon={<AddIcon width="60" height="60" />}
            />
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
            {/* <Card
              text="RGB Strip-1"
              onClick={() => {
                setEditingOpen(true);
                setEditing(1);
              }}
              icon={<AddIcon width="60" height="60" />}
            /> */}
          </div>
        </div>
      </div>
      <div>
        {editing === 1 && (
          <div
            style={{ position: "relative", width: "100vw", height: "100vh" }}
          >
            <DeviceSettings />
          </div>
        )}
        {editing === 2 && (
          <div
            style={{ position: "relative", width: "100vw", height: "100vh" }}
          >
            <DeviceContextProvider>
              <NewDevice
                onFinish={() => {
                  setEditingOpen(false);
                }}
              />
            </DeviceContextProvider>
          </div>
        )}
      </div>
    </VerticalTransition>
  );
};

export default DevicesPage;
