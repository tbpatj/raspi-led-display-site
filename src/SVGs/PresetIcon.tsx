import { BasicIcon } from "./types";

const PresetIcon: React.FC<BasicIcon> = ({
  width = "22",
  height = "17",
  stroke = "#ECE5EC",
  strokeWidth = "2",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.99997H14M18 1.99997H21M1 7.99997H5M9 7.99997H21M1 15H10M14 15H21"
        stroke={stroke}
        strokeLinecap="round"
      />
      <rect x="6" y="5.99997" width="2" height="4" rx="0.75" fill={stroke} />
      <rect
        x="15"
        y="-3.05176e-05"
        width="2"
        height="4"
        rx="0.75"
        fill={stroke}
      />
      <rect x="11" y="13" width="2" height="4" rx="0.75" fill={stroke} />
    </svg>
  );
};

export default PresetIcon;
