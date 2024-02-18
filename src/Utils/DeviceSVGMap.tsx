import AddIcon from "../SVGs/AddIcon";
import AddressableWheelIcon from "../SVGs/AddressableWheelIcon";
import RGBWheelIcon from "../SVGs/RGBWheelIcon";

export const DeviceSVGMap = (type: string, scale: number = 1) => {
  if (type === "addressable")
    return (
      <AddressableWheelIcon
        width={`${100 * scale}px`}
        height={`${100 * scale}px`}
      />
    );
  else if (type === "non-addressable") {
    return (
      <RGBWheelIcon width={`${100 * scale}px`} height={`${100 * scale}px`} />
    );
  } else if (type === "new-device") {
    return <AddIcon width="60" height="60" />;
  }
};
