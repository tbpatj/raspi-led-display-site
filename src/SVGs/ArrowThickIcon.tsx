import { BasicIcon } from "./types";

const ArrowThickIcon: React.FC<BasicIcon> = ({
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
      <g id="Rectangle 10">
        <path
          d="M0.707122 14.8492C0.316597 14.4587 0.316598 13.8256 0.707122 13.435L13.435 0.707107C13.8256 0.316583 14.4587 0.316583 14.8493 0.707107L15.5564 1.41421C15.9469 1.80474 15.9469 2.4379 15.5564 2.82843L2.82844 15.5563C2.43792 15.9469 1.80475 15.9469 1.41423 15.5563L0.707122 14.8492Z"
          fill={stroke}
        />
        <path
          d="M14.8493 27.5564C14.4587 27.9469 13.8256 27.9469 13.4351 27.5564L0.707137 14.8284C0.316613 14.4379 0.316613 13.8048 0.707137 13.4142L1.41424 12.7071C1.80477 12.3166 2.43793 12.3166 2.82846 12.7071L15.5564 25.435C15.9469 25.8256 15.9469 26.4587 15.5564 26.8493L14.8493 27.5564Z"
          fill={stroke}
        />
      </g>
    </svg>
  );
};

export default ArrowThickIcon;
