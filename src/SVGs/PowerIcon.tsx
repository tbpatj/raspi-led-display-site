import { BasicIcon } from "./types";

const PowerIcon: React.FC<BasicIcon> = ({
  width = "20",
  height = "22",
  stroke = "#ECE5EC",
  strokeWidth = "2",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Ellipse 5"
        d="M10 1V9M6 4.5C2.40295 5.62265 1 8.62749 1 12.4286C1 17.1624 5.02944 21 10 21C14.9706 21 19 17.1624 19 12.4286C19 8.62749 17.597 5.62265 14 4.5"
        stroke={stroke}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default PowerIcon;
