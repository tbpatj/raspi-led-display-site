import { useEffect, useMemo, useRef, useState } from "react";

interface UseWinSize {
  isMobile: boolean;
  isSmall: boolean;
  isTablet: boolean;
  isMid: boolean;
  isDesktop: boolean;
  isLarge: boolean;
}

const widths = {
  Mobile: { min: 0, max: 420 },
  Small: { min: 0, max: 900 },
  Tablet: { min: 420, max: 1280 },
  Mid: { min: 900, max: 1920 },
  Desktop: { min: 1280, max: 1920 },
  Large: { min: 1920, max: -1 },
};

const useWinSize: () => UseWinSize = () => {
  const widthRef = useRef(window.innerWidth);
  //rand state just helps us rerun our useMemo so we aren't causing a ton of rerenders when the dom gets resized.
  const [randState, setRandState] = useState(-1);

  //actual function to check if the user crossed a device threshold, -1 is basically infinity
  const crossedBarrier = (barrier: number, newWidth: number) => {
    if (
      ((widthRef.current > barrier && newWidth < barrier) ||
        (widthRef.current < barrier && newWidth > barrier)) &&
      barrier !== -1
    )
      return true;
  };

  //iterate through the devices types and check if the user resized the window past any
  const hasCrossedBarrier = (newWidth: number) => {
    for (const j in widths) {
      const curWidth = widths[j as keyof typeof widths];
      if (crossedBarrier(curWidth.max, newWidth)) {
        return true;
      }
    }
    return false;
  };

  const handleWindowSizeChange = (e: any) => {
    const newWidth =
      e?.currentTarget?.innerWidth ??
      e?.target?.innerWidth ??
      window.innerWidth;

    if (hasCrossedBarrier(newWidth)) {
      widthRef.current = newWidth;
      setRandState(Math.random());
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  //go through each of the widths and figure out what size the display is.
  const getSize = () => {
    const sizes = {
      isMobile: false,
      isSmall: false,
      isTablet: false,
      isMid: false,
      isDesktop: false,
      isBig: false,
      isLarge: false,
    };
    //iterate through the object of device sizes and see if it is within
    for (const j in widths) {
      const curWidth = widths[j as keyof typeof widths];
      if (
        (widthRef.current <= curWidth.max || curWidth.max === -1) &&
        (widthRef.current > curWidth.min || curWidth.min === -1)
      ) {
        sizes[`is${j}` as keyof typeof sizes] = true;
      }
    }
    sizes["isBig"] = sizes["isDesktop"] || sizes["isLarge"];
    return sizes;
  };
  return useMemo(() => getSize(), [randState]);
};

export default useWinSize;
