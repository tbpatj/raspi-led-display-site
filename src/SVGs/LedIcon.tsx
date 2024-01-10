import { BasicIcon } from "./types";

const LedIcon: React.FC<BasicIcon> = ({
  width = "15",
  height = "22",
  stroke = "#ece5ec",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2667 10V5.28571C12.2667 4.14907 11.7645 3.05898 10.8705 2.25526C9.97662 1.45153 8.7642 1 7.5 1C6.2358 1 5.02338 1.45153 4.12946 2.25526C3.23553 3.05898 2.73333 4.14907 2.73333 5.28571V10M12.2667 10H13C13.5523 10 14 10.4477 14 11V12.4286C14 12.9809 13.5523 13.4286 13 13.4286H10.3167M12.2667 10H2.73333M2.73333 10H2C1.44772 10 1 10.4477 1 11V12.4286C1 12.9809 1.44771 13.4286 2 13.4286H4.68333M4.68333 22V13.4286M4.68333 13.4286H10.3167M10.3167 22V13.4286"
        stroke={stroke}
      />
    </svg>
  );
};

export default LedIcon;
