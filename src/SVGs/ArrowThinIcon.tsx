import { BasicIcon } from "./types";

const ArrowThinIcon: React.FC<BasicIcon> = ({
  width = "16",
  height = "28",
  stroke = "#ece5ec",
  style,
  className,
}) => {
  return (
    <svg
      style={style}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Rectangle 11">
        <path
          d="M14.6239 27.8025C14.3636 28.0628 13.8359 27.9573 13.4454 27.5668L0.717498 14.8388C0.326974 14.4483 0.221446 13.9207 0.481796 13.6603L0.9532 13.1889C1.21355 12.9286 1.74119 13.0341 2.13171 13.4246L14.8596 26.1525C15.2502 26.5431 15.3557 27.0707 15.0953 27.3311L14.6239 27.8025Z"
          fill={stroke}
        />
        <path
          d="M0.471435 14.6136C0.211086 14.3532 0.316613 13.8256 0.707137 13.435L13.4351 0.707124C13.8256 0.3166 14.3532 0.211071 14.6136 0.47142L15.085 0.942825C15.3453 1.20317 15.2398 1.73081 14.8493 2.12134L2.12135 14.8493C1.73083 15.2398 1.20319 15.3453 0.942839 15.085L0.471435 14.6136Z"
          fill={stroke}
        />
      </g>
    </svg>
  );
};

export default ArrowThinIcon;
