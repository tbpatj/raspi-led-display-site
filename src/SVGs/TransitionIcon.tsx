import { BasicIcon } from "./types";

const TransitionIcon: React.FC<BasicIcon> = ({
  width = "15",
  height = "15",
  stroke = "#ECE5EC",
  strokeWidth = "2",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 9H13.5C13.7761 9 14 8.77614 14 8.5V1.5C14 1.22386 13.7761 1 13.5 1H6.5C6.22386 1 6 1.22386 6 1.5V6"
        stroke={stroke}
      />
      <path
        d="M7.5 6H1.5C1.22386 6 1 6.22386 1 6.5V13.5C1 13.7761 1.22386 14 1.5 14H8.5C8.77614 14 9 13.7761 9 13.5V7.5"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M9 5L3.5 10L5 11.5L10 6L11 7L12 3L8 4L9 5Z"
        stroke={stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TransitionIcon;
