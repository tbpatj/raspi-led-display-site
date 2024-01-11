import { BasicIcon } from "./types";

const InfoIcon: React.FC<BasicIcon> = ({
  width = "13",
  height = "13",
  stroke = "#ece5ec",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1">
        <path
          id="Vector"
          d="M6.5 3.2V6.72M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z"
          stroke={stroke}
          stroke-linecap="round"
        />
        <circle id="Ellipse 11" cx="6.5" cy="8.5" r="0.5" fill={stroke} />
      </g>
    </svg>
  );
};

export default InfoIcon;
