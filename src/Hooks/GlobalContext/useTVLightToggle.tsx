import { useCallback, useState } from "react";

interface TVLightToggleProps {}

interface TVLightToggleHook {
  tvShown: boolean;
  toggleTvShown: (nVal?: boolean) => void;
}

const useTVLightToggle: (
  props: TVLightToggleProps
) => TVLightToggleHook = ({}) => {
  const [tvShown, setTVShown] = useState(false);
  const toggleTvShown = useCallback(
    (nVal?: boolean) => {
      setTVShown(nVal ?? !tvShown);
    },
    [setTVShown, tvShown]
  );

  return {
    tvShown,
    toggleTvShown,
  };
};

export default useTVLightToggle;
