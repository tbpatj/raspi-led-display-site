import { useState } from "react";
import Card from "../Components/Cards/Card";
import AddIcon from "../SVGs/AddIcon";
import VerticalTransition from "../Components/TransitionContainers/VerticalTransition";

const DevicesPage = () => {
  const [editing, setEditing] = useState(0);
  const [editingOpen, setEditingOpen] = useState(false);
  return (
    <VerticalTransition
      id="devices-transition-top"
      selected={editingOpen === false ? 0 : 1}
    >
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
          <Card
            text="RGB Strip-1"
            onClick={() => {
              setEditingOpen(true);
              setEditing(1);
            }}
            icon={<AddIcon width="60" height="60" />}
          />
        </div>
      </div>
      <div>
        <div
          className={`back-nav ${editingOpen ? "opened" : ""}`}
          onClick={() => setEditingOpen(false)}
        >
          Back
        </div>
        {editing === 1 && <>editing device</>}
        {editing === 2 && <></>}
      </div>
    </VerticalTransition>
  );
};

export default DevicesPage;
