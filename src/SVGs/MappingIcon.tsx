import { BasicIcon } from "./types";

const MappingIcon: React.FC<BasicIcon> = ({
  width = "23",
  height = "19",
  stroke = "#ECE5EC",
  strokeWidth = "2",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4V13C1 13.5523 1.39175 14 1.875 14H8C8.48325 14 8.875 13.5523 8.875 13V10.8659M1 4V2C1 1.44772 1.39175 1 1.875 1H8C8.48325 1 8.875 1.44772 8.875 2V4M1 4H8.875M8.875 4V5M14.125 8V6C14.125 5.44772 14.5168 5 15 5H21.125C21.6082 5 22 5.44772 22 6V8M14.125 8H22M14.125 8V10M22 8V17C22 17.5523 21.6082 18 21.125 18H15C14.5168 18 14.125 17.5523 14.125 17V15.5M8.875 5H12.375L13 10H14.125M8.875 5V7.5M14.125 10V12M8.875 7.5H11L11.5 12H14.125M8.875 7.5V10.8659M14.125 12V15.5M8.875 10.8659H10L10.5 15.5H14.125M2.5 6H7M2.5 8H5.5M2.5 10H7M2.5 12H4M16 10H19M16 12H20M16 14H17.5M16 16H19.5M15.5 6.5H16.5M2.5 2.5H3.5"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MappingIcon;
