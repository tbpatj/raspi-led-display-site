import { BasicIcon } from "./types";

const BrightnessIcon: React.FC<BasicIcon> = ({
  width = "18",
  height = "18",
  stroke = "#ece5ec",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Brightness"
        d="M9 3.18182V1M14.8182 9L17 9M9 14.8182L9 17M3.18182 9H1M13.1141 4.88592L14.6568 3.34314M13.1141 13.1141L14.6568 14.6568M4.88593 4.88593L3.34315 3.34315M4.88593 13.1141L3.34315 14.6568M13.3636 9C13.3636 11.41 11.41 13.3636 9 13.3636C6.59003 13.3636 4.63636 11.41 4.63636 9C4.63636 6.59003 6.59003 4.63636 9 4.63636C11.41 4.63636 13.3636 6.59003 13.3636 9Z"
        stroke={stroke}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default BrightnessIcon;
