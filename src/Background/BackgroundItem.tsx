import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { cloneDeep } from "lodash";
import useWinSize from "../Hooks/useWinSize";

interface BackgroundItemProps {
  index: number;
}

const BackgroundItem: React.FC<BackgroundItemProps> = ({ index }) => {
  const { tvShown } = useContext(GlobalContext);
  const { isSmall, isTablet } = useWinSize();
  const ref = useRef<NodeJS.Timeout>();

  const range = useMemo(() => {
    const range = { offset: 400, mul: 100, posOffset: 10, posMul: 80 };
    if (isTablet) {
      range.offset = 300;
      range.mul = 150;
    } else if (isSmall) {
      range.offset = 150;
      range.mul = 150;
    }
    return range;
  }, [isSmall]);

  const [perc, setPerc] = useState({
    x: Math.random() * range.posMul + range.posOffset,
    y: Math.random() * range.posMul + range.posOffset,
    w: Math.random() * range.mul + range.offset,
    h: Math.random() * range.mul + range.offset,
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
      let w = perc.w;
      let h = perc.h;
      let x = 25 + Math.random() * 50 - (w / 2 / window.innerWidth) * 100;
      // const x = 25 + Math.random() * 50 - (w / 2 / window.innerWidth) * 100;
      const hP = (80 / window.innerHeight) * 100;
      const h2 =
        ((0.5 * window.innerWidth * (9 / 16)) / window.innerHeight) * 100;
      let y = hP + Math.random() * h2 - (h / 2 / window.innerHeight) * 100;
      let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
      //left edge
      if (index === 2) {
        x = 5;
        y = 50;
        w = window.innerWidth * 0.1;
        h = window.innerHeight - window.innerWidth * 0.02;
        color = "#01008e";
      } else if (index === 0) {
        //top edge
        x = 50;
        y = 5;
        w = window.innerWidth - window.innerHeight * 0.15;
        h = window.innerHeight * 0.1;
        color = "#9001f5";
      } else if (index === 3) {
        //right edge
        x = 95;
        y = 50;
        w = window.innerWidth * 0.1;
        h = window.innerHeight - window.innerWidth * 0.02;
        color = "#fe00ea";
      } else if (index === 1) {
        //bottom edge
        x = 50;
        y = 95;
        w = window.innerWidth - window.innerHeight * 0.15;
        h = window.innerHeight * 0.1;
        color = `#ff0178`;
      }

      setPerc({ x, y, w, h, color: color });
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
        borderRadius: !tvShown ? "50%" : "0%",
      }}
    ></div>
  );
};

export default BackgroundItem;
