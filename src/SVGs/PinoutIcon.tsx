import { BasicIcon } from "./types";

const PinoutIcon: React.FC<BasicIcon> = ({
  width = "58",
  height = "42",
  stroke = "#ece5ec",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 58 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Pinout Icon">
        <path
          id="Vector"
          d="M16 39V41H27V39M16 39V32H27V39M16 39H3C1.89543 39 1 38.1046 1 37V3C1 1.89543 1.89543 1 3 1H53C54.1046 1 55 1.89543 55 3V11M27 39H31M31 39V41H36V39M31 39V32H36V39M36 39H53C54.1046 39 55 38.1046 55 37V35M55 25H44V35H55M55 25H57V35H55M55 25V19M55 19H57V11H46V19H55ZM33 12V22H23V15L26.5 12H33Z"
          stroke={stroke}
        />
        <circle
          id="Ellipse 7"
          cx="5.5"
          cy="5.5"
          r="1"
          fill={stroke}
          stroke={stroke}
        />
        <circle
          id="Ellipse 8"
          cx="39.5"
          cy="5.5"
          r="1"
          fill={stroke}
          stroke={stroke}
        />
        <circle
          id="Ellipse 9"
          cx="39.5"
          cy="33.5"
          r="1"
          fill={stroke}
          stroke={stroke}
        />
        <circle
          id="Ellipse 10"
          cx="5.5"
          cy="33.5"
          r="1"
          fill={stroke}
          stroke={stroke}
        />
        <g id="Vector_2">
          <path d="M10 3H12V5H10V3Z" fill={stroke} />
          <path d="M14 3H16V5H14V3Z" fill={stroke} />
          <path d="M18 3H20V5H18V3Z" fill={stroke} />
          <path d="M26 3H28V5H26V3Z" fill={stroke} />
          <path d="M30 3H32V5H30V3Z" fill={stroke} />
          <path d="M34 3H36V5H34V3Z" fill={stroke} />
          <path d="M22 3H24V5H22V3Z" fill={stroke} />
          <path d="M10 6H12V8H10V6Z" fill={stroke} />
          <path d="M14 6H16V8H14V6Z" fill={stroke} />
          <path d="M18 6H20V8H18V6Z" fill={stroke} />
          <path d="M26 6H28V8H26V6Z" fill={stroke} />
          <path d="M30 6H32V8H30V6Z" fill={stroke} />
          <path d="M34 6H36V8H34V6Z" fill={stroke} />
          <path d="M22 6H24V8H22V6Z" fill={stroke} />
        </g>
        <g id="Vector_3">
          <path d="M4 12H6V30H4V12Z" fill={stroke} />
          <path d="M4 12H8V14H4V12Z" fill={stroke} />
          <path d="M4 16H8V18H4V16Z" fill={stroke} />
          <path d="M4 28H8V30H4V28Z" fill={stroke} />
          <path d="M4 24H8V26H4V24Z" fill={stroke} />
          <path d="M4 20H8V22H4V20Z" fill={stroke} />
        </g>
      </g>
    </svg>
  );
};

export default PinoutIcon;
