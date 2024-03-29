import { BasicIcon } from "./types";

const ImageIcon: React.FC<BasicIcon> = ({
  width = "23",
  height = "19",
  stroke = "#ece5ec",
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
        id="image"
        d="M1 14.1364V16C1 17.1046 1.89543 18 3 18H5.75472M1 14.1364V3C1 1.89543 1.89543 1 3 1H20C21.1046 1 22 1.89543 22 3V11.8182M1 14.1364L4.35753 11.2717C5.14768 10.5975 6.32238 10.6404 7.06127 11.3703L9.86106 14.1364M5.75472 18H20C21.1046 18 22 17.1046 22 16V11.8182M5.75472 18L9.86106 14.1364M22 11.8182L18.415 8.60204C17.6415 7.9082 16.4656 7.92217 15.7089 8.63417L9.86106 14.1364M8.13208 4.86364C8.13208 5.71717 7.42249 6.40909 6.54717 6.40909C5.67185 6.40909 4.96226 5.71717 4.96226 4.86364C4.96226 4.01011 5.67185 3.31818 6.54717 3.31818C7.42249 3.31818 8.13208 4.01011 8.13208 4.86364Z"
        stroke={stroke}
      />
    </svg>
  );
};

export default ImageIcon;
