import { BasicIcon } from "./types";

const RGBStripIcon: React.FC<BasicIcon> = ({
  width = "76",
  height = "16",
  stroke = "#ece5ec",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 5H15V11H9V5Z" fill="#00ABE7" />
      <path d="M22 5H28V11H22V5Z" fill="#00ABE7" />
      <path d="M35 5H41V11H35V5Z" fill="#00ABE7" />
      <path d="M48 5H54V11H48V5Z" fill="#00ABE7" />
      <path d="M61 5H67V11H61V5Z" fill="#00ABE7" />
      <path d="M1 1H75V15H1V1Z" stroke={stroke} />
      <path d="M9 5H15V11H9V5Z" stroke={stroke} />
      <path d="M22 5H28V11H22V5Z" stroke={stroke} />
      <path d="M35 5H41V11H35V5Z" stroke={stroke} />
      <path d="M48 5H54V11H48V5Z" stroke={stroke} />
      <path d="M61 5H67V11H61V5Z" stroke={stroke} />
    </svg>
  );
};

export default RGBStripIcon;
