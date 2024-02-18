import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { cloneDeep } from "lodash";

const BackgroundItem = () => {
  const { tvShown } = useContext(GlobalContext);
  const [perc, setPerc] = useState({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    w: Math.random() * 100 + 400,
    h: Math.random() * 100 + 400,
    color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`,
  });

  const [storedPerc, setStoredPerc] = useState(cloneDeep(perc));

  useEffect(() => {
    if (!tvShown) {
      setStoredPerc(cloneDeep(perc));
    }
  }, [perc]);

  useEffect(() => {
    if (tvShown) {
      const w = perc.w;
      const h = perc.h;
      const x = 25 + Math.random() * 50 - (w / 2 / window.innerWidth) * 100;
      const hP = (80 / window.innerHeight) * 100;
      const h2 =
        ((0.5 * window.innerWidth * (9 / 16)) / window.innerHeight) * 100;
      const y = hP + Math.random() * h2 - (h / 2 / window.innerHeight) * 100;

      // const x =
      //   Math.random() *
      //   (100 -
      //     tvPosition.leftPx +
      //     (tvPosition.rightPx - tvPosition.leftPx) / window.innerWidth);

      setPerc({ x, y, w, h, color: perc.color });
    } else {
      setPerc(storedPerc);
    }
  }, [tvShown]);
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
