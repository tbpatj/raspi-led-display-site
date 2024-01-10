import { useState } from "react";

const BackgroundItem = () => {
  const [perc, setPerc] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
    w: Math.random() * 100 + 400,
    h: Math.random() * 100 + 400,
    color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`,
  });
  return (
    <div
      className="background-item"
      style={{
        left: `${perc.x}%`,
        top: `${perc.y}%`,
        width: `${perc.w}px`,
        height: `${perc.h}px`,
        backgroundColor: perc.color,
      }}
    ></div>
  );
};

export default BackgroundItem;
